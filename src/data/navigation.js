export const navLinks = [
  {
    label: "Inicio",
    path: "/",
  },
  {
    label: "Nosotros",
    path: "/nosotros",
  },
  {
    label: "Productos",
    path: "/productos",
    dropdown: [
      {
        label: "Gift Cards",
        icon: "ti-gift",
        path: "/productos/giftcards",
      },
      {
        label: "Juegos",
        icon: "ti-device-gamepad-2",
        path: "/productos/juegos",
      },
    ],
  },
  {
    label: "Comunidad",
    path: "/comunidad",
    dropdown: [
      {
        label: "Blog",
        icon: "ti-file-description",
        path: "/comunidad/blog",
      },
      {
        label: "Consejos y guias",
        icon: "ti-dual-screen",
        path: "/comunidad/guias",
      },
    ],
  },
  {
    label: "Ayuda",
    path: "/ayuda",
    dropdown: [
      {
        label: "Preguntas frecuentes",
        icon: "ti-help-circle",
        path: "/ayuda/preguntas-frecuentes",
      },
      {
        label: "Formulario de contacto",
        icon: "ti-mail",
        path: "/ayuda/contacto",
      },
    ],
  },
];

export const socialLinks = [
  { name: "YouTube", icon: "ti-brand-youtube", href: "#" },
  { name: "Discord", icon: "ti-brand-discord", href: "#" },
  { name: "Twitter", icon: "ti-brand-twitter", href: "#" },
  { name: "Instagram", icon: "ti-brand-instagram", href: "#" },
];

