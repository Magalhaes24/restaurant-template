import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const storedLanguage = localStorage.getItem("lumeo-language");
const fallbackLng = storedLanguage || "pt";

const resources = {
  pt: {
    common: {
      nav: {
        home: "Início",
        about: "Sobre",
        menus: "Menus",
        contact: "Contacto",
        admin: "Admin",
      },
      actions: {
        book: "Reservar mesa",
        discover: "Descobrir menu",
        contact: "Fale connosco",
        viewSite: "Ver website",
        save: "Guardar",
        add: "Adicionar",
        delete: "Eliminar",
        signIn: "Entrar",
        signOut: "Sair",
      },
      labels: {
        language: "Idioma",
        theme: "Tema",
        light: "Claro",
        dark: "Escuro",
      },
      form: {
        name: "Nome",
        email: "Email",
        phone: "Telefone",
        date: "Data",
        time: "Hora",
        guests: "Pessoas",
        notes: "Notas",
        message: "Mensagem",
        required: "Obrigatório",
        send: "Enviar pedido",
        success: "Recebemos o seu pedido. Respondemos em breve.",
        error: "Não foi possível enviar. Tente novamente.",
      },
      admin: {
        title: "Painel",
        loginTitle: "Acesso reservado",
        loginSubtitle: "Introduza as suas credenciais para gerir o conteúdo.",
        loading: "A carregar conteúdo...",
        error: "Não foi possível carregar os dados.",
        empty: "Sem conteúdo guardado.",
        invalid: "Credenciais inválidas.",
      },
      fallback: "Conteúdo em atualização.",
    },
  },
  en: {
    common: {
      nav: {
        home: "Home",
        about: "About",
        menus: "Menus",
        contact: "Contact",
        admin: "Admin",
      },
      actions: {
        book: "Book a table",
        discover: "Discover menu",
        contact: "Contact us",
        viewSite: "View website",
        save: "Save",
        add: "Add",
        delete: "Delete",
        signIn: "Sign in",
        signOut: "Sign out",
      },
      labels: {
        language: "Language",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
      },
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        date: "Date",
        time: "Time",
        guests: "Guests",
        notes: "Notes",
        message: "Message",
        required: "Required",
        send: "Send request",
        success: "We received your request. We'll reply shortly.",
        error: "Unable to send. Please try again.",
      },
      admin: {
        title: "Dashboard",
        loginTitle: "Private access",
        loginSubtitle: "Enter your credentials to manage content.",
        loading: "Loading content...",
        error: "Unable to load data.",
        empty: "No content stored yet.",
        invalid: "Invalid credentials.",
      },
      fallback: "Content is being curated.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: fallbackLng,
  fallbackLng: "pt",
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lumeo-language", lng);
});

export default i18n;
