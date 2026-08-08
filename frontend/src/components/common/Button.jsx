import { forwardRef } from "react";
import { motion } from "framer-motion";

const variantClasses = {
  primary:
    "bg-henna-brown text-cream border border-henna-brown hover:bg-coffee-brown hover:border-coffee-brown",
  secondary:
    "bg-soft-gold text-coffee-brown border border-soft-gold hover:bg-beige-dark hover:border-beige-dark",
  outline:
    "bg-transparent text-henna-brown border border-henna-brown hover:bg-henna-brown hover:text-cream",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      type = "button",
      loading = false,
      disabled = false,
      onClick,
      className = "",
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.03 } : {}}
        whileTap={!isDisabled ? { scale: 0.97 } : {}}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={`inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${
          variantClasses[variant]
        } ${
          isDisabled
            ? "cursor-not-allowed opacity-60 hover:bg-none"
            : "cursor-pointer"
        } ${className}`}
        {...rest}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;