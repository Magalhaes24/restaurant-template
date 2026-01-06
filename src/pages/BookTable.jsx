import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { useSeo } from "../lib/seo.js";
import { useContent } from "../data/contentStore.jsx";
import { pickLocale } from "../lib/locale.js";
import { db } from "../lib/firebase.js";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Input from "../components/ui/Input.jsx";
import Textarea from "../components/ui/Textarea.jsx";
import PageTransition from "../components/PageTransition.jsx";
import SectionReveal from "../components/SectionReveal.jsx";

const BookTable = () => {
  const { t, i18n } = useTranslation();
  const { restaurant } = useContent();
  const lang = i18n.language;
  const brand = pickLocale(restaurant?.name, lang) || "Lumeo";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useSeo({
    title: `${brand} — ${t("actions.book")}`,
    description: "Reserve a table for a refined dining experience.",
    ogTitle: `${brand} — ${t("actions.book")}`,
    ogDescription: "Reserve a table for a refined dining experience.",
    ogImage: "/og-placeholder.svg",
  });

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t("form.required");
    if (!form.email.trim()) nextErrors.email = t("form.required");
    if (!form.phone.trim()) nextErrors.phone = t("form.required");
    if (!form.date.trim()) nextErrors.date = t("form.required");
    if (!form.time.trim()) nextErrors.time = t("form.required");
    if (!form.guests.trim()) nextErrors.guests = t("form.required");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      if (!db) {
        throw new Error("Firestore unavailable.");
      }
      await addDoc(collection(db, "reservations"), {
        ...form,
        guests: Number(form.guests),
        status: "pending",
        language: lang,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        notes: "",
      });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <PageTransition>
      <section className="space-y-12">
        <div>
          <p className="section-kicker">{t("actions.book")}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Reserve a table, tailored to you.
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <SectionReveal>
            <Card>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400" htmlFor="name">
                    {t("form.name")}
                  </label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <p className="mt-1 text-xs text-pearl-600">{errors.name}</p>}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                      htmlFor="email"
                    >
                      {t("form.email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-pearl-600">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                      htmlFor="phone"
                    >
                      {t("form.phone")}
                    </label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(event) => setForm({ ...form, phone: event.target.value })}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-pearl-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                      htmlFor="date"
                    >
                      {t("form.date")}
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(event) => setForm({ ...form, date: event.target.value })}
                      aria-invalid={Boolean(errors.date)}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-pearl-600">{errors.date}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                      htmlFor="time"
                    >
                      {t("form.time")}
                    </label>
                    <Input
                      id="time"
                      type="time"
                      value={form.time}
                      onChange={(event) => setForm({ ...form, time: event.target.value })}
                      aria-invalid={Boolean(errors.time)}
                    />
                    {errors.time && (
                      <p className="mt-1 text-xs text-pearl-600">{errors.time}</p>
                    )}
                  </div>
                  <div>
                    <label
                      className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                      htmlFor="guests"
                    >
                      {t("form.guests")}
                    </label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={(event) => setForm({ ...form, guests: event.target.value })}
                      aria-invalid={Boolean(errors.guests)}
                    />
                    {errors.guests && (
                      <p className="mt-1 text-xs text-pearl-600">{errors.guests}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs uppercase tracking-[0.3em] text-pearl-600 dark:text-ink-400"
                    htmlFor="notes"
                  >
                    {t("form.notes")}
                  </label>
                  <Textarea
                    id="notes"
                    rows="3"
                    value={form.notes}
                    onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  />
                </div>
                <Button type="submit" disabled={status === "loading"}>
                  {t("actions.book")}
                </Button>
                {status === "success" && (
                  <p className="text-sm text-pearl-700">{t("form.success")}</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-pearl-600">{t("form.error")}</p>
                )}
              </form>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="space-y-4">
              <p className="section-kicker">Details</p>
              <p className="text-sm text-pearl-700 dark:text-ink-300">
                {pickLocale(restaurant?.address, lang) || t("fallback")}
              </p>
              <div className="text-sm text-pearl-800 dark:text-ink-300">
                <p>{restaurant?.phone}</p>
                <p>{restaurant?.email}</p>
              </div>
              <div className="h-40 rounded-2xl bg-gradient-to-br from-ink-100 to-pearl-100 dark:from-ink-800 dark:to-ink-700" />
            </Card>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
};

export default BookTable;

