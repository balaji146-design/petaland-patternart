import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const initialForm = {
  name: "",
  mobile: "",
  email: "",
  message: "",
};

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.mobile.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^[0-9]{10}$/.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}

function ContactForm() {
  const [formValues, setFormValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormValues(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-medium tracking-wide text-coffee-brown"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full rounded-md border bg-cream px-4 py-3 text-sm text-coffee-brown placeholder:text-coffee-brown/40 focus:border-henna-brown ${
            errors.name ? "border-red-400" : "border-beige-dark"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="mb-1.5 block text-xs font-medium tracking-wide text-coffee-brown"
        >
          Mobile Number
        </label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          value={formValues.mobile}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={`w-full rounded-md border bg-cream px-4 py-3 text-sm text-coffee-brown placeholder:text-coffee-brown/40 focus:border-henna-brown ${
            errors.mobile ? "border-red-400" : "border-beige-dark"
          }`}
        />
        {errors.mobile && (
          <p className="mt-1 text-xs text-red-500">{errors.mobile}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-medium tracking-wide text-coffee-brown"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`w-full rounded-md border bg-cream px-4 py-3 text-sm text-coffee-brown placeholder:text-coffee-brown/40 focus:border-henna-brown ${
            errors.email ? "border-red-400" : "border-beige-dark"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium tracking-wide text-coffee-brown"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formValues.message}
          onChange={handleChange}
          placeholder="Tell us about your henna requirements..."
          className={`w-full resize-none rounded-md border bg-cream px-4 py-3 text-sm text-coffee-brown placeholder:text-coffee-brown/40 focus:border-henna-brown ${
            errors.message ? "border-red-400" : "border-beige-dark"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
        className={`mt-2 flex items-center justify-center gap-2 rounded-md bg-henna-brown px-6 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors duration-300 hover:bg-coffee-brown ${
          isSubmitting ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
      >
        {isSubmitting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
        ) : (
          <FaPaperPlane className="text-base" />
        )}
        {isSubmitting ? "Sending..." : "Send Message"}
      </motion.button>

      {isSubmitted && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-sm font-medium text-henna-brown"
        >
          Thank you! Your message has been sent successfully.
        </motion.p>
      )}
    </form>
  );
}

export default ContactForm;