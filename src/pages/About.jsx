import { useTranslation } from "react-i18next";
import { useSeo } from "../lib/seo.js";
import { useContent } from "../data/contentStore.jsx";
import { pickLocale } from "../lib/locale.js";
import Card from "../components/ui/Card.jsx";
import SectionReveal from "../components/SectionReveal.jsx";
import PageTransition from "../components/PageTransition.jsx";

const tableImage = new URL("../assets/img/table.jpg", import.meta.url).href;
const waiterImage = new URL("../assets/img/waiters.jpg", import.meta.url).href;
const kitchenImage = new URL("../assets/img/kitchen.jpg", import.meta.url).href;
const cooksImage = new URL("../assets/img/cooks-working.jpg", import.meta.url).href;
const orderCheckImage = new URL("../assets/img/cook-checking-order.jpg", import.meta.url).href;

const About = () => {
  const { t, i18n } = useTranslation();
  const { restaurant } = useContent();
  const lang = i18n.language;

  const brand = pickLocale(restaurant?.name, lang) || "Lumeo";
  const story = pickLocale(restaurant?.story, lang);
  const chefNote = pickLocale(restaurant?.chefNote, lang);
  const values = restaurant?.values || [];

  useSeo({
    title: `${brand} — ${t("nav.about")}`,
    description: story || "A refined dining experience.",
    ogTitle: `${brand} — ${t("nav.about")}`,
    ogDescription: story || "A refined dining experience.",
    ogImage: "/og-placeholder.svg",
  });

  return (
    <PageTransition>
      <section className="space-y-12">
        <div>
          <p className="section-kicker">About</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Our story, shaped by quiet rituals.
          </h1>
        </div>

        <SectionReveal className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-4">
            <p className="section-kicker">Story</p>
            <p className="text-sm text-pearl-700 dark:text-ink-300">
              {story || t("fallback")}
            </p>
          </Card>
          <div className="relative overflow-hidden rounded-[36px] shadow-soft">
            <div
              className="h-full min-h-[280px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${kitchenImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Kitchen
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden rounded-[36px] shadow-soft">
            <div
              className="h-full min-h-[280px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${cooksImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Cooks working
            </div>
          </div>
          <Card className="space-y-4">
            <p className="section-kicker">Chef</p>
            <p className="text-sm text-pearl-700 dark:text-ink-300">
              {chefNote || t("fallback")}
            </p>
          </Card>
        </SectionReveal>

        <SectionReveal className="grid gap-6 md:grid-cols-3">
          <Card className="space-y-3">
            <p className="section-kicker">Precision</p>
            <p className="text-sm text-pearl-800 dark:text-ink-300">
              Timing and texture are measured down to the second, ensuring every dish arrives
              exactly as intended.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="section-kicker">Origin</p>
            <p className="text-sm text-pearl-800 dark:text-ink-300">
              We work with coastal suppliers and small farms to keep the menu grounded in the season.
            </p>
          </Card>
          <Card className="space-y-3">
            <p className="section-kicker">Care</p>
            <p className="text-sm text-pearl-800 dark:text-ink-300">
              Service flows quietly in the background, ensuring the table remains the focus.
            </p>
          </Card>
        </SectionReveal>

        <SectionReveal className="grid gap-6 md:grid-cols-3">
          {values.length === 0 && (
            <p className="text-sm text-pearl-700">{t("admin.empty")}</p>
          )}
          {values.map((value, index) => (
            <Card key={index} className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400">
                Value {index + 1}
              </p>
              <p className="text-sm text-pearl-800 dark:text-ink-300">
                {pickLocale(value, lang)}
              </p>
            </Card>
          ))}
        </SectionReveal>

        <SectionReveal className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[36px] shadow-soft">
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${tableImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Table
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] shadow-soft">
            <div
              className="h-full min-h-[320px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${waiterImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Waiters
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <Card className="space-y-4">
            <p className="section-kicker">Ritual</p>
            <p className="text-sm text-pearl-700 dark:text-ink-300">
              Each service is a sequence of calm gestures, from the first greeting to the last pour.
            </p>
          </Card>
          <div className="relative overflow-hidden rounded-[36px] shadow-soft">
            <div
              className="h-full min-h-[280px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${orderCheckImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent" />
            <div className="absolute left-6 top-6 rounded-full bg-pearl-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-pearl-700 backdrop-blur dark:bg-ink-800/80 dark:text-pearl-100">
              Order check
            </div>
          </div>
        </SectionReveal>
      </section>
    </PageTransition>
  );
};

export default About;

