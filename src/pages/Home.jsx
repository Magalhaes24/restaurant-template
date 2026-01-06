import { useTranslation } from "react-i18next";
import { useSeo } from "../lib/seo.js";
import { useContent } from "../data/contentStore.jsx";
import { pickLocale } from "../lib/locale.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import PageTransition from "../components/PageTransition.jsx";
import ScrollAccent from "../components/ScrollAccent.jsx";

const scrollImage = new URL("../assets/img/table-interior.jpg", import.meta.url).href;
const heroImage = new URL("../assets/img/plating-chef.jpg", import.meta.url).href;
const serviceImage = new URL("../assets/img/table-food.jpg", import.meta.url).href;
const serviceImage2 = new URL("../assets/img/cook-checking-order.jpg", import.meta.url).href;
const exteriorImage = new URL("../assets/img/exterior.jpg", import.meta.url).href;
const fishImage = new URL("../assets/img/plate-fish.jpg", import.meta.url).href;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const { restaurant, highlights, testimonials, hours, loading } = useContent();
  const lang = i18n.language;

  const brand = pickLocale(restaurant?.name, lang) || "Lumeo";
  const heroTitle = pickLocale(restaurant?.heroTitle, lang) || t("fallback");
  const heroSubtitle = pickLocale(restaurant?.heroSubtitle, lang);
  const heroCta = pickLocale(restaurant?.heroCta, lang) || t("actions.book");
  const atmosphere = pickLocale(restaurant?.atmosphere, lang);

  useSeo({
    title: `${brand} — ${t("nav.home")}`,
    description: heroSubtitle || "A refined dining experience.",
    ogTitle: `${brand} — ${t("nav.home")}`,
    ogDescription: heroSubtitle || "A refined dining experience.",
    ogImage: "/og-placeholder.svg",
  });

  return (
    <PageTransition>
      <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          className="space-y-7"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={staggerItem}>
            <Badge>{t("nav.home")}</Badge>
          </motion.div>
          <motion.h1
            className="text-4xl font-semibold tracking-tight md:text-6xl"
            variants={staggerItem}
          >
            {heroTitle}
          </motion.h1>
          <motion.p className="text-lg text-pearl-700 dark:text-ink-300" variants={staggerItem}>
            {heroSubtitle || t("fallback")}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={staggerItem}>
            <Button as={Link} to="/book">
              {heroCta}
            </Button>
            <Button as={Link} to="/menus" variant="outline">
              {t("actions.discover")}
            </Button>
          </motion.div>
        </motion.div>
        <div className="relative">
          <div className="absolute -right-8 top-6 hidden h-56 w-56 rounded-full bg-pearl-200/60 blur-3xl md:block" />
          <div className="relative overflow-hidden rounded-[36px] shadow-soft">
            <motion.div
              initial={{ scale: 1.03, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-[360px] w-full bg-cover bg-center md:h-[420px]"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Signature plating
            </div>
            <div className="absolute bottom-6 left-6 right-6 space-y-3 rounded-3xl bg-pearl-50/85 p-5 backdrop-blur dark:bg-ink-800/80">
              <p className="section-kicker">{brand}</p>
              <p className="text-sm text-pearl-800 dark:text-ink-300">
                {atmosphere || t("fallback")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionReveal className="mt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-kicker">Highlights</p>
            <h2 className="section-title">Featured dishes</h2>
          </div>
          <Button as={Link} to="/menus" variant="ghost">
            {t("actions.discover")}
          </Button>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {loading && <p className="text-sm text-pearl-700">{t("admin.loading")}</p>}
            {!loading && highlights.length === 0 && (
              <p className="text-sm text-pearl-700">{t("admin.empty")}</p>
            )}
            {highlights.slice(0, 2).map((item, index) => (
              <motion.div
                key={item.id}
                className="flex flex-col gap-5 rounded-[32px] border border-pearl-100/80 bg-pearl-50/70 p-6 shadow-soft backdrop-blur dark:border-ink-700/50 dark:bg-ink-800/80 md:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div
                  className="h-48 w-full rounded-3xl bg-cover bg-center md:h-44 md:w-48"
                  style={
                    item.image
                      ? { backgroundImage: `url(${item.image})` }
                      : {}
                  }
                />
                <div className="flex-1 space-y-2 dark:bg-ink-800/85 dark:text-pearl-100 dark:rounded-2xl dark:p-4">
                  <p className="text-lg font-medium">{pickLocale(item.title, lang)}</p>
                  <p className="text-sm text-pearl-700 dark:text-ink-300">
                    {pickLocale(item.description, lang)}
                  </p>
                  <p className="text-sm font-semibold text-ink-900 dark:text-pearl-100">
                    {item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="relative overflow-hidden rounded-[36px] shadow-soft"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${serviceImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Seasonal tasting
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-pearl-50/85 p-5 backdrop-blur dark:bg-ink-800/80">
              <p className="section-kicker">Service</p>
              <p className="text-sm text-pearl-800 dark:text-ink-300">
                Silent choreography, visible care.
              </p>
            </div>
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal className="mt-24">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="section-kicker">Atmosphere</p>
            <h2 className="section-title">Quietly immersive</h2>
            <p className="text-sm text-pearl-700 dark:text-ink-300">
              {atmosphere || t("fallback")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400">
                  Materials
                </p>
                <p className="text-sm text-pearl-800 dark:text-ink-300">
                  Brushed metal, limestone, and oak invite a slow exhale.
                </p>
              </Card>
              <Card className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400">
                  Soundscape
                </p>
                <p className="text-sm text-pearl-800 dark:text-ink-300">
                  A curated playlist with soft instrumentation and warm lows.
                </p>
              </Card>
            </div>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-[36px] shadow-soft"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${scrollImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Dining room
            </div>
          </motion.div>
        </div>
      </SectionReveal>

      <ScrollAccent
        note="Service"
        title="A choreography of quiet gestures"
        subtitle="From the first pour to the last plate, timing and calm shape the experience."
        image={serviceImage2}
      />

      <SectionReveal className="mt-24">
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr]">
          <motion.div
            className="relative overflow-hidden rounded-[36px] shadow-soft"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${exteriorImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Riverside arrival
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-pearl-50/85 p-5 backdrop-blur dark:bg-ink-800/80">
              <p className="section-kicker">Arrival</p>
              <p className="text-sm text-pearl-800 dark:text-ink-300">
                A calm entrance that sets the pace for the evening.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="relative overflow-hidden rounded-[32px] shadow-soft"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${fishImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Catch of the day
            </div>
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal className="mt-24">
        <p className="section-kicker">Testimonials</p>
        <h2 className="section-title">Guest impressions</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.id} className="space-y-4">
              <p className="text-sm text-pearl-700 dark:text-ink-300">
                “{pickLocale(item.quote, lang)}”
              </p>
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400">
                  {pickLocale(item.role, lang)}
                </p>
              </div>
            </Card>
          ))}
          {!loading && testimonials.length === 0 && (
            <p className="text-sm text-pearl-700">{t("admin.empty")}</p>
          )}
        </div>
      </SectionReveal>

      <SectionReveal className="mt-24" id="contact">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-4">
            <p className="section-kicker">Location</p>
            <h2 className="section-title">{brand}</h2>
            <p className="text-sm text-pearl-700 dark:text-ink-300">
              {pickLocale(restaurant?.address, lang) || t("fallback")}
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <span>{restaurant?.phone}</span>
              <span>{restaurant?.email}</span>
            </div>
          </Card>
          <Card className="space-y-4">
            <p className="section-kicker">Hours</p>
            <div className="space-y-3 text-sm">
              {(hours?.entries || []).map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between text-pearl-800 dark:text-ink-300"
                >
                  <span>{pickLocale(entry.label, lang)}</span>
                  <span>
                    {entry.open} — {entry.close}
                  </span>
                </div>
              ))}
              {!hours?.entries?.length && <p>{t("admin.empty")}</p>}
              {hours?.note && (
                <p className="pt-2 text-xs text-pearl-600 dark:text-ink-400">
                  {pickLocale(hours.note, lang)}
                </p>
              )}
            </div>
          </Card>
        </div>
      </SectionReveal>
    </PageTransition>
  );
};

export default Home;
