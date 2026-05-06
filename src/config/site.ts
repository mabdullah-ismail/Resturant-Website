export type MenuItem = { name: string; price: string; desc?: string };
export type MenuCategory = { category: string; items: MenuItem[] };

export const siteConfig = {
  brand: {
    name: "THE GRILL HOUSE",
    shortName: "T.G.H",
    motto: "REAL FLAVOR, NO COMPROMISE",
    established: "2024",
  },
  hero: {
    title: "THE ULTIMATE",
    titleAccent: "EXPERIENCE",
    boldText: "TASTE THE FIRE.",
    revealText: "UNLEASHED",
    revealSubtext: "FLAVOR",
  },
  verdict: {
    heading: "BEYOND FOOD",
    subheading: "A culinary journey in every single bite.",
  },
  links: {
    maps: "https://maps.google.com",
    order: "https://your-ordering-platform.com",
    instagram: "#",
    tiktok: "#",
    facebook: "#",
  },
  menu: [
    {
      category: "STARTERS",
      items: [
        { name: "Signature Wings (6)", price: "$9.99" },
        { name: "Crispy Tenders (3)", price: "$8.49" },
        { name: "Mozzarella Sticks", price: "$7.99" },
        { name: "Garlic Herb Bread", price: "$5.49" },
      ]
    },
    {
      category: "MAINS - BURGERS",
      items: [
        { name: "The Classic Grill", desc: "Prime beef, secret sauce, artisanal bun", price: "$14.99" },
        { name: "Smoky BBQ Burger", desc: "Smoked bacon, onion rings, BBQ glaze", price: "$15.99" },
        { name: "Firehouse Spicy", desc: "Jalapeños, pepper jack, spicy aioli", price: "$14.49" },
      ]
    },
    {
      category: "SIDES",
      items: [
        { name: "Hand-Cut Fries", price: "$4.99" },
        { name: "Truffle Parm Fries", price: "$7.99" },
        { name: "Garden Salad", price: "$6.49" },
      ]
    },
    {
      category: "PIZZAS",
      items: [
        { name: "The Signature Red", price: "$18.99" },
        { name: "Pepperoni Feast", price: "$19.99" },
        { name: "Garden Fresh", price: "$17.99" },
      ]
    },
    {
      category: "DESSERTS",
      items: [
        { name: "Molten Lava Cake", price: "$8.99" },
        { name: "NY Cheesecake", price: "$7.49" },
      ]
    }
  ],
  footer: {
    copyright: "© 2024 THE GRILL HOUSE",
    subtext: "PREMIUM NEXT.JS STARTER",
  }
};

export type SiteConfig = typeof siteConfig;
