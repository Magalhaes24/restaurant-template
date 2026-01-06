import clsx from "clsx";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-ink-900 text-pearl-100 hover:bg-ink-800 dark:bg-ink-50 dark:text-ink-900 dark:hover:bg-ink-200",
  secondary:
    "bg-pearl-50/80 text-ink-900 hover:bg-pearl-50 dark:bg-ink-800/80 dark:text-pearl-100 dark:hover:bg-ink-700/80",
  ghost: "bg-transparent text-ink-700 hover:text-ink-900 dark:text-ink-300",
  outline:
    "border border-ink-200 text-ink-700 hover:border-ink-400 dark:border-ink-700 dark:text-ink-200",
};

const sizes = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2 text-xs",
};

const Button = ({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className,
  ...props
}) => {
  const MotionComp = motion(Comp);
  return (
    <MotionComp
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Button;
