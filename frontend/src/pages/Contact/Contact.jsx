import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import SEO from "../../components/common/SEO.jsx";
import ContactForm from "../../components/contact/ContactForm.jsx";

const contactDetails = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 63699 60501",
    href: "https://wa.me/6369960501",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@petalandpatternart",
    href: "https://instagram.com/petalandpatternart",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "hello@petalandpatternart.com",
    href: "mailto:hello@petalandpatternart.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Studio Address",
    value: "Available for bookings worldwide",
    href: null,
  },
];

function Contact() {
  return (
    <div className="w-full">
      <SEO
        title="Contact Us | Petaland Patternart"
        description="Get in touch with Petaland Patternart for premium henna bookings, custom designs, and bridal appointments via WhatsApp, Instagram, or email."
        keywords="contact petaland patternart, henna booking, mehndi appointment, whatsapp booking"
      />

      <section className="bg-beige/40 py-16 sm:py-20">
        <div className="container-luxury text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-xs font-medium tracking-[0.3em] text-soft-gold"
          >
            GET IN TOUCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-semibold text-henna-brown sm:text-5xl"
          >
            Let's Create Something Beautiful
          </motion.h1>
          <div className="divider-luxury" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-sm text-coffee-brown sm:text-base"
          >
            Reach out to book your session or ask about custom henna designs
            for your next celebration.
          </motion.p>
        </div>
      </section>

      <section className="container-luxury py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="mb-6 font-serif text-2xl font-semibold text-henna-brown sm:text-3xl">
              Business Information
            </h2>

            <div className="flex flex-col gap-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 rounded-xl border border-beige-dark bg-cream p-5 shadow-luxury transition-colors duration-300 hover:border-henna-brown">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-henna-brown/10 text-xl text-henna-brown">
                      <Icon />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-coffee-brown/60">
                        {item.label}
                      </p>
                      <p className="font-medium text-coffee-brown">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-2xl border border-beige-dark bg-cream p-6 shadow-luxury sm:p-10"
          >
            <h2 className="mb-6 font-serif text-2xl font-semibold text-henna-brown sm:text-3xl">
              Send Us a Message
            </h2>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <section className="container-luxury pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-beige-dark shadow-luxury"
        >
          <iframe
            title="Petaland Patternart Location"
            src="https://www.google.com/maps?q=India&output=embed"
            className="h-80 w-full sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;