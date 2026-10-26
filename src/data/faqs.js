export const faqCategories = [
  { id: "todo", label: "Todo" },
  { id: "pedidos", label: "Pedidos" },
  { id: "pagos", label: "Pagos" },
  { id: "envios", label: "Envíos" },
  { id: "cuenta", label: "Cuenta" },
  { id: "soporte", label: "Soporte" },
];

export const faqSections = [
  {
    id: "pedidos",
    category: "pedidos",
    title: "PEDIDOS Y COMPRAS",
    items: [
      {
        id: "faq-rastrear",
        question: "¿Cómo puedo rastrear el estado de mi pedido?",
        answer: "Ingresa a Mi Cuenta › Mis Pedidos, selecciona tu pedido y podrás ver el estado en tiempo real. Cuando despachemos tu pedido, también te enviaremos un correo con el enlace de seguimiento.",
        routeHighlight: "Mi Cuenta › Mis Pedidos",
      },
      {
        id: "faq-modificar",
        question: "¿Puedo modificar o cancelar un pedido después de realizarlo?",
        answer: "Puedes modificar o cancelar tu pedido dentro de las 2 horas posteriores a la compra. Contáctanos por chat o correo y lo gestionamos de inmediato.",
      },
      {
        id: "faq-devolucion",
        question: "¿Cómo iniciar una devolución o cambio?",
        answer: "Tienes hasta 7 días calendario desde que recibes tu pedido para solicitar un cambio o devolución. El producto debe estar sellado y en su empaque original. Contáctanos por correo o a través del formulario de contacto para iniciar el proceso.",
      },
      {
        id: "faq-incorrecto",
        question: "¿Qué hago si recibí un producto incorrecto o dañado?",
        answer: "Fotografía el producto recibido y envíanos las imágenes a través del formulario de contacto. Procederemos con el cambio o reembolso según corresponda.",
      },
    ],
  },
  {
    id: "pagos",
    category: "pagos",
    title: "PAGOS Y FACTURACIÓN",
    items: [
      {
        id: "faq-pago",
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos Visa, Mastercard, Yape, Plin, transferencia bancaria y pago contra entrega en Lima. Todos los pagos son seguros.",
      },
      {
        id: "faq-factura",
        question: "¿Cómo puedo solicitar una factura?",
        answer: "Tu comprobante de pago se genera automáticamente con cada compra. Puedes descargarlo desde Mi Cuenta › Mis Pedidos en cualquier momento.",
        routeHighlight: "Mi Cuenta › Mis Pedidos",
      },
    ],
  },
  {
    id: "envios",
    category: "envios",
    title: "ENVÍOS Y ENTREGAS",
    items: [
      {
        id: "faq-envio",
        question: "¿Cuánto tiempo tarda el envío?",
        answer: "En Lima Metropolitana el plazo es de 1 a 3 días hábiles. Para provincias, de 3 a 7 días según la localidad. Te notificamos por correo en cuanto tu pedido salga.",
      },
      {
        id: "faq-direccion",
        question: "¿Puedo cambiar la dirección de envío después de hacer un pedido?",
        answer: "Puedes actualizar la dirección dentro de las 2 horas posteriores al pedido, antes de que entre a proceso de preparación. Contáctanos por chat a la brevedad si necesitas hacerlo.",
      },
      {
        id: "faq-retraso",
        question: "¿Qué hago si mi pedido no llega a tiempo?",
        answer: "Verifica el estado con el número de guía que te enviamos por correo. Si la fecha estimada ya venció sin novedades, contáctanos y revisamos el caso con la empresa de transporte.",
      },
      {
        id: "faq-gratis",
        question: "¿Tienen envío gratis? ¿Desde qué monto?",
        answer: "Sí. Los pedidos desde S/.500 tienen envío gratuito en Lima Metropolitana. Para provincias, el envío es gratuito desde S/.800.",
      },
    ],
  },
  {
    id: "cuenta",
    category: "cuenta",
    title: "CUENTA Y PERFIL",
    items: [
      {
        id: "faq-contrasena",
        question: "¿Cómo puedo restablecer mi contraseña?",
        answer: "En la pantalla de inicio de sesión, haz clic en \"¿Olvidaste tu contraseña?\", ingresa tu correo y te enviaremos un enlace para crear una nueva. Revisa también tu carpeta de spam si no lo recibes.",
      },
      {
        id: "faq-perfil",
        question: "¿Cómo puedo actualizar mi información personal?",
        answer: "Accede a Mi Cuenta › Configuración para actualizar tu nombre, correo, dirección de envío y contraseña.",
        routeHighlight: "Mi Cuenta › Configuración",
      },
      {
        id: "faq-eliminar",
        question: "¿Cómo puedo eliminar mi cuenta?",
        answer: "Por el momento esta opción no está disponible desde la plataforma. Escríbenos a soporte@respawnstore.com con el asunto \"Eliminar cuenta\" y lo procesamos en un plazo de 48 horas hábiles.",
      },
    ],
  },
  {
    id: "soporte",
    category: "soporte",
    title: "SOPORTE Y ASISTENCIA",
    items: [
      {
        id: "faq-contacto",
        question: "¿Cómo puedo contactar al soporte?",
        answer: "Puedes escribirnos por chat para una respuesta inmediata, por correo si tu consulta no es urgente, o completar el formulario de contacto para casos que requieran más detalle.",
      },
      {
        id: "faq-horario",
        question: "¿Cuál es el horario de atención del soporte?",
        answer: "Atendemos de lunes a viernes de 9:00 a.m. a 6:00 p.m. y los sábados de 9:00 a.m. a 1:00 p.m. (hora Lima). Los domingos no hay atención.",
      },
    ],
  },
];

