import { addDoc, collection, doc, setDoc } from "firebase/firestore";

  const demoImages = {
    plating: new URL("../assets/img/plating-chef.jpg", import.meta.url).href,
    interior: new URL("../assets/img/table-interior.jpg", import.meta.url).href,
    service: new URL("../assets/img/table-food.jpg", import.meta.url).href,
    exterior: new URL("../assets/img/exterior.jpg", import.meta.url).href,
    kitchen: new URL("../assets/img/kitchen.jpg", import.meta.url).href,
  };

export const seedContent = async (db) => {
  if (!db) return;

  await setDoc(
    doc(db, "site", "restaurant"),
    {
      name: { pt: "Lumeo", en: "Lumeo" },
      tagline: {
        pt: "Cozinha sazonal à beira do Tejo.",
        en: "Seasonal dining by the Tagus.",
      },
      heroTitle: {
        pt: "Uma mesa luminosa, uma pausa tranquila.",
        en: "A luminous table, a quiet pause.",
      },
      heroSubtitle: {
        pt: "Pratos de origem atlântica, serviço atento e um ambiente minimalista pensado ao detalhe.",
        en: "Atlantic-forward plates, attentive service, and a minimal space tuned to detail.",
      },
      heroCta: { pt: "Reservar mesa", en: "Book a table" },
      story: {
        pt: "Lumeo nasceu da vontade de criar um restaurante onde o tempo abranda. O menu acompanha a maré: peixe do dia, vegetais de produtores locais e técnicas suaves para preservar a essência dos sabores.",
        en: "Lumeo was built to slow time. The menu follows the tide: daily catch, local produce, and gentle techniques that preserve the soul of each ingredient.",
      },
      chefNote: {
        pt: "A cozinha é direta e elegante, com foco no essencial. Cada prato é terminado no momento, com textura e temperatura perfeitas.",
        en: "The kitchen is direct and elegant, focused on essentials. Every plate is finished to order with precise texture and temperature.",
      },
      values: [
        { pt: "Sazonalidade e transparência.", en: "Seasonality and transparency." },
        { pt: "Serviço silencioso e preciso.", en: "Quiet, precise service." },
        { pt: "Detalhe em cada gesto.", en: "Care in every gesture." },
      ],
      atmosphere: {
        pt: "Vidro, pedra e madeira clara criam um espaço sereno, com luz quente e acústica suave.",
        en: "Glass, stone, and light wood create a calm room with warm light and soft acoustics.",
      },
      address: { pt: "Rua do Arsenal 18, Lisboa", en: "Rua do Arsenal 18, Lisbon" },
      phone: "+351 210 456 220",
      email: "reservas@lumeo.pt",
      mapEmbedUrl: "",
      social: {
        instagram: "https://instagram.com/lumeorestaurant",
        facebook: "https://facebook.com/lumeorestaurant",
      },
    },
    { merge: true }
  );

  await setDoc(
    doc(db, "hours", "default"),
    {
      entries: [
        {
          label: { pt: "Segunda a Quinta", en: "Monday to Thursday" },
          open: "12:30",
          close: "23:00",
        },
        {
          label: { pt: "Sexta e Sábado", en: "Friday & Saturday" },
          open: "12:30",
          close: "00:00",
        },
        {
          label: { pt: "Domingo", en: "Sunday" },
          open: "12:30",
          close: "22:00",
        },
      ],
      note: {
        pt: "Última reserva às 21:30. Menu de degustação disponível mediante pedido.",
        en: "Last booking at 21:30. Tasting menu available on request.",
      },
    },
    { merge: true }
  );

  await Promise.all([
    setDoc(
      doc(db, "highlights", "coastal-tasting"),
      {
        title: { pt: "Degustação Atlântica", en: "Atlantic Tasting" },
        description: {
          pt: "Cinco momentos de mar e costa com finalização à mesa.",
          en: "Five coastal moments finished tableside.",
        },
        price: "€85",
        image: demoImages.plating,
      },
      { merge: true }
    ),
      setDoc(
        doc(db, "highlights", "glasshouse-lunch"),
        {
          title: { pt: "Almoço no Jardim", en: "Glasshouse Lunch" },
        description: {
          pt: "Menu executivo leve com entrada, prato e sobremesa.",
          en: "Light executive menu with starter, main, and dessert.",
        },
        price: "€32",
          image: demoImages.kitchen,
        },
        { merge: true }
      ),
    setDoc(
      doc(db, "highlights", "chef-table"),
      {
        title: { pt: "Chef Table", en: "Chef Table" },
        description: {
          pt: "Uma experiência intimista para 6 pessoas.",
          en: "An intimate experience for 6 guests.",
        },
        price: "€120",
        image: demoImages.exterior,
      },
      { merge: true }
    ),
  ]);

  await Promise.all([
    setDoc(
      doc(db, "testimonials", "ines"),
      {
        name: "Ines Carvalho",
        role: { pt: "Diretora criativa", en: "Creative director" },
        quote: {
          pt: "Tudo e silencioso e perfeito, da iluminacao ao ultimo prato.",
          en: "Everything feels quiet and perfect, from lighting to the final plate.",
        },
      },
      { merge: true }
    ),
    setDoc(
      doc(db, "testimonials", "miguel"),
      {
        name: "Miguel Santos",
        role: { pt: "Chef convidado", en: "Guest chef" },
        quote: {
          pt: "Uma cozinha limpa, precisa e com respeito pelo produto.",
          en: "A clean, precise kitchen with deep respect for ingredients.",
        },
      },
      { merge: true }
    ),
    setDoc(
      doc(db, "testimonials", "laura"),
      {
        name: "Laura Meireles",
        role: { pt: "Empresaria", en: "Entrepreneur" },
        quote: {
          pt: "O ambiente e tao memoravel quanto o menu.",
          en: "The atmosphere is as memorable as the menu.",
        },
      },
      { merge: true }
    ),
  ]);

  await Promise.all([
    setDoc(
      doc(db, "menuCategories", "starters"),
      {
        name: { pt: "Entradas", en: "Starters" },
        order: 1,
        items: [
          {
            name: { pt: "Tartaro de lirio", en: "Amberjack tartare" },
            description: {
              pt: "Citricos, pepino e azeite de coentros.",
              en: "Citrus, cucumber, and coriander oil.",
            },
            price: "€18",
            tags: [
              { pt: "Fresco", en: "Fresh" },
              { pt: "Sem gluten", en: "Gluten-free" },
            ],
          },
          {
            name: { pt: "Caldo de mar", en: "Sea broth" },
            description: {
              pt: "Mariscos, algas e pao de massa mae.",
              en: "Shellfish, seaweed, and sourdough.",
            },
            price: "€16",
            tags: [{ pt: "Quente", en: "Warm" }],
          },
        ],
      },
      { merge: true }
    ),
    setDoc(
      doc(db, "menuCategories", "mains"),
      {
        name: { pt: "Pratos principais", en: "Mains" },
        order: 2,
        items: [
          {
            name: { pt: "Robalo em brasa", en: "Charred sea bass" },
            description: {
              pt: "Manteiga noisette, funcho e limao.",
              en: "Brown butter, fennel, and lemon.",
            },
            price: "€28",
            tags: [{ pt: "Assado", en: "Charred" }],
          },
          {
            name: { pt: "Lombo de vaca", en: "Aged beef loin" },
            description: {
              pt: "Pure de aipo, molho de vinho tinto.",
              en: "Celeriac puree, red wine jus.",
            },
            price: "€32",
            tags: [{ pt: "Classico", en: "Classic" }],
          },
        ],
      },
      { merge: true }
    ),
    setDoc(
      doc(db, "menuCategories", "desserts"),
      {
        name: { pt: "Sobremesas", en: "Desserts" },
        order: 3,
        items: [
          {
            name: { pt: "Citricos e iogurte", en: "Citrus & yogurt" },
            description: {
              pt: "Mel, ervas frescas e merengue.",
              en: "Honey, fresh herbs, and meringue.",
            },
            price: "€12",
            tags: [{ pt: "Leve", en: "Light" }],
          },
          {
            name: { pt: "Chocolate do mar", en: "Sea salt chocolate" },
            description: {
              pt: "Caramelo salgado e flor de sal.",
              en: "Salted caramel and sea salt.",
            },
            price: "€12",
            tags: [{ pt: "Rico", en: "Rich" }],
          },
        ],
      },
      { merge: true }
    ),
    setDoc(
      doc(db, "menuCategories", "drinks"),
      {
        name: { pt: "Bebidas", en: "Drinks" },
        order: 4,
        items: [
          {
            name: { pt: "Vinhos do Atlantico", en: "Atlantic wines" },
            description: {
              pt: "Selecao de pequenos produtores.",
              en: "Selection from small producers.",
            },
            price: "€9",
            tags: [{ pt: "Copo", en: "Glass" }],
          },
          {
            name: { pt: "Cocktail Lumeo", en: "Lumeo cocktail" },
            description: {
              pt: "Gin, lucia-lima e espuma citrica.",
              en: "Gin, lemon verbena, and citrus foam.",
            },
            price: "€11",
            tags: [{ pt: "Assinatura", en: "Signature" }],
          },
        ],
      },
      { merge: true }
    ),
  ]);

  await addDoc(collection(db, "reservations"), {
    name: "Ana Rodrigues",
    email: "ana.rodrigues@email.pt",
    phone: "+351 911 234 567",
    date: "2026-06-12",
    time: "20:30",
    guests: 2,
    notes: "Mesa junto a janela.",
    status: "confirmed",
    language: "pt",
  });

  await addDoc(collection(db, "contactRequests"), {
    name: "Daniel Sousa",
    email: "daniel.sousa@email.pt",
    message: "Gostava de organizar um jantar privado para 10 pessoas.",
    language: "pt",
  });
};
