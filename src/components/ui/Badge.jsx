import clsx from "clsx";

const Badge = ({ className, ...props }) => (
  <span
    className={clsx(
      "inline-flex items-center rounded-full border border-ink-200 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-pearl-700 dark:border-ink-700 dark:text-ink-300",
      className
    )}
    {...props}
  />
);

export default Badge;
