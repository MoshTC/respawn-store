const GAMES_DATA = [
  {
    id: "gow-ragnarok",
    name: "God of War Ragnarök",
    platform: "PlayStation 5",
    category: "playstation",
    genre: "Acción / Aventura",
    price: 249,
    oldPrice: 299,
    image: "imagenes/godOfwarR.jpg",
    rating: 4.9,
    badge: "GOTY WINNER",
    description: "Únete a Kratos y Atreus en un viaje mítico en busca de respuestas antes de que llegue el Ragnarök anunciado."
  },
  {
    id: "halo-infinite",
    name: "Halo Infinite",
    platform: "Xbox Series X",
    category: "xbox",
    genre: "Shooter / FPS",
    price: 189,
    oldPrice: 229,
    image: "imagenes/HaloINf.jpg",
    rating: 4.7,
    badge: "EXCLUSIVO",
    description: "Cuando toda esperanza se ha perdido y el destino de la humanidad pende de un hilo, el Jefe Maestro está listo para enfrentarse al enemigo más despiadado."
  },
  {
    id: "zelda-totk",
    name: "The Legend of Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    category: "nintendo",
    genre: "Aventura / RPG",
    price: 269,
    oldPrice: 299,
    image: "imagenes/zelda.jpg",
    rating: 5.0,
    badge: "OBRA MAESTRA",
    description: "Una aventura épica por las tierras y los cielos de Hyrule. El límite es tu propia imaginación con las nuevas habilidades de Link."
  },
  {
    id: "spiderman-2",
    name: "Marvel's Spider-Man 2",
    platform: "PlayStation 5",
    category: "playstation",
    genre: "Acción / Mundo Abierto",
    price: 259,
    oldPrice: 299,
    image: "imagenes/spiderman2.jpg",
    rating: 4.9,
    badge: "BESTSELLER",
    description: "Los Spider-Men Peter Parker y Miles Morales regresan para una nueva y emocionante aventura en la aclamada franquicia de Marvel."
  },
  {
    id: "elden-ring",
    name: "Elden Ring: Shadow of the Erdtree",
    platform: "Multiplataforma",
    category: "playstation",
    genre: "Acción / Souls",
    price: 289,
    oldPrice: 319,
    image: "imagenes/eldenring.png",
    rating: 4.9,
    badge: "GOTY",
    description: "Guiados por el empíreo Miquella, los jugadores son convocados a la Tierra Sombría para desvelar los oscuros secretos del mundo."
  },
  {
    id: "cyberpunk-2077",
    name: "Cyberpunk 2077: Phantom Liberty",
    platform: "Multiplataforma",
    category: "pc",
    genre: "RPG / Ciencia Ficción",
    price: 199,
    oldPrice: 249,
    image: "imagenes/cyberpunk2077.png",
    rating: 4.8,
    badge: "ACTUALIZADO",
    description: "Sumérgete en el emocionante thriller de espionaje en el nuevo y peligroso distrito de Dogtown en Night City."
  },
  {
    id: "forza-horizon-5",
    name: "Forza Horizon 5",
    platform: "Xbox Series X",
    category: "xbox",
    genre: "Carreras / Mundo Abierto",
    price: 199,
    oldPrice: 239,
    image: "imagenes/forzahorizon5.png",
    rating: 4.9,
    badge: "GRÁFICOS TOP",
    description: "Explora los vibrantes paisajes en constante evolución de México con una conducción ilimitada y divertida en cientos de los mejores autos del mundo."
  },
  {
    id: "smash-bros-ultimate",
    name: "Super Smash Bros. Ultimate",
    platform: "Nintendo Switch",
    category: "nintendo",
    genre: "Lucha / Multijugador",
    price: 249,
    oldPrice: 279,
    image: "imagenes/supersmashbros.png",
    rating: 4.9,
    badge: "MULTIJUGADOR",
    description: "Mundos y luchadores legendarios de los videojuegos se encuentran en el enfrentamiento definitivo con más de 80 combatientes."
  }
];

const GIFTCARDS_DATA = [
  {
    id: "gc-playstation",
    name: "Tarjeta PlayStation Store Digital",
    platform: "PlayStation Network",
    category: "playstation",
    image: "imagenes/articulo1.webp",
    denominations: [50, 100, 150, 250],
    rating: 4.9,
    description: "Saldo digital oficial para PlayStation Store. Compra juegos, complementos y suscripciones de PlayStation Plus al instante."
  },
  {
    id: "gc-xbox",
    name: "Tarjeta Xbox & Game Pass Digital",
    platform: "Xbox Live / PC",
    category: "xbox",
    image: "imagenes/articulo2.webp",
    denominations: [50, 100, 150, 200],
    rating: 4.9,
    description: "Código oficial canjeable para comprar juegos, DLCs y suscripciones a Xbox Game Pass Ultimate."
  },
  {
    id: "gc-nintendo",
    name: "Tarjeta Nintendo eShop Digital",
    platform: "Nintendo Switch",
    category: "nintendo",
    image: "imagenes/articulo5.webp",
    denominations: [50, 100, 150, 200],
    rating: 4.9,
    description: "El regalo perfecto para cualquier usuario de Nintendo Switch. Canjea saldo para descargar cientos de títulos en la eShop."
  },
  {
    id: "gc-steam",
    name: "Tarjeta Steam Wallet Digital",
    platform: "PC Steam",
    category: "pc",
    image: "imagenes/steam.jpg",
    denominations: [40, 80, 150, 300],
    rating: 5.0,
    description: "Agrega fondos a tu cartera de Steam y disfruta de las mejores rebajas de temporada en miles de títulos."
  },
  {
    id: "gc-roblox",
    name: "Tarjeta de Regalo Roblox Digital",
    platform: "Roblox",
    category: "pc",
    image: "imagenes/roblox.jpg",
    denominations: [40, 80, 150],
    rating: 4.8,
    description: "Consigue Robux y membresías Premium para desbloquear artículos exclusivos y avatares en tus experiencias favoritas."
  },
  {
    id: "gc-freefire",
    name: "Diamantes Free Fire Directos",
    platform: "Móvil / Garena",
    category: "movil",
    image: "imagenes/freefire.jpg",
    denominations: [20, 50, 100, 200],
    rating: 4.7,
    description: "Recarga de diamantes al instante a tu ID de jugador con bonificación en cada paquete seleccionado."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAMES_DATA, GIFTCARDS_DATA };
}

