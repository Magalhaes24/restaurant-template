import { useTranslation } from "react-i18next";
import { useContent } from "../data/contentStore.jsx";

const Footer = () => {
  const { i18n } = useTranslation();
  const { restaurant } = useContent();
  const brand = restaurant?.name?.[i18n.language] || "Lumeo";
  const address = restaurant?.address?.[i18n.language];

  return (
    <footer className="border-t border-pearl-100/80 bg-pearl-50/85 py-12 backdrop-blur dark:border-ink-700/40 dark:bg-ink-900/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold">{brand}</p>
          <p className="mt-2 text-sm text-pearl-700 dark:text-ink-400">
            {address || "Lisboa, Portugal"}
          </p>
        </div>
        <div className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-500">
          {new Date().getFullYear()} {brand}. Crafted with quiet precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

