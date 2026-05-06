export type MenuItem = { name: string; price: string; desc?: string };
export type MenuCategory = { category: string; items: MenuItem[] };

export const siteConfig = {
  brand: {
    name: "BELLY BRO'S",
    shortName: "B.B",
    motto: "NO DIET, JUST BITE",
    established: "2024",
  },
  hero: {
    title: "THE MOMENT",
    titleAccent: "TRUTH",
    boldText: "BUILT FOR THE BOLD.",
    revealText: "UNWRAPPED",
    revealSubtext: "PERFECTION",
  },
  verdict: {
    heading: "NOT GUILTY",
    subheading: "Flavor so intense, it should be a felony.",
  },
  links: {
    maps: "https://www.google.com/maps/place/belly+bros/data=!4m2!3m1!1s0x3919036cc83bebed:0xcd8774190ddb6f18?sa=X&ved=1t:242&ictx=111",
    order: "https://www.foodpanda.pk/restaurant/jqef/bellybros?utm_campaign=google_reserve_place_order_action_CH-SEO_",
    instagram: "#",
    tiktok: "#",
    facebook: "#",
  },
  menu: [
    {
      category: "STARTERS",
      items: [
        { name: "Chicken Tenders 3 Pcs", price: "Rs. 649" },
        { name: "Chicken Tenders 6 Pcs", price: "Rs. 1149" },
        { name: "Nuggets 6 Pcs", price: "Rs. 349" },
        { name: "Bihari Roll", price: "Rs. 649" },
        { name: "Bihari Roll Platter", price: "Rs. 1199" },
        { name: "Oven Baked Wings (6)", price: "Rs. 549" },
        { name: "Oven Baked Wings (12)", price: "Rs. 1099" },
      ]
    },
    {
      category: "FRIES",
      items: [
        { name: "Loaded Fries", price: "Rs. 699" },
        { name: "Charcoal Shawarma Fries", price: "Rs. 899" },
        { name: "Cheesy Loaded Fries", price: "Rs. 849" },
        { name: "Plain Fries", price: "Rs. 349" },
        { name: "Masala Fries", price: "Rs. 399" },
      ]
    },
    {
      category: "PIZZAS - CLASSIC",
      items: [
        { name: "Creamy Tikka", price: "S:599 | M:1299 | L:2199" },
        { name: "Cheese Lover", price: "S:599 | M:1299 | L:2199" },
        { name: "Lasagna Pizza", price: "S:599 | M:1299 | L:2199" },
        { name: "Chicken Fajita", price: "S:599 | M:1299 | L:2199" },
        { name: "BBQ Pizza", price: "S:599 | M:1299 | L:2199" },
      ]
    },
    {
      category: "PIZZAS - PREMIUM",
      items: [
        { name: "Kebab Stuffer", price: "S:749 | M:1599 | L:2499" },
        { name: "Crown Crust", price: "S:749 | M:1599 | L:2499" },
        { name: "Ranch Style Pizza", price: "S:749 | M:1599 | L:2499" },
        { name: "Chicken Supreme", price: "S:749 | M:1599 | L:2499" },
        { name: "Beef Pepperoni", price: "S:749 | M:1599 | L:2499" },
        { name: "Achari Pizza", price: "S:749 | M:1599 | L:2499" },
        { name: "Malai Boti", price: "S:749 | M:1599 | L:2499" },
      ]
    },
    {
      category: "SHAWARMA",
      items: [
        { name: "Charcoal Iraqi Shawarma Chicken", desc: "Saaj Bread With Garlic Sauce, Pickle and Fries", price: "Rs. 699" },
        { name: "Charcoal Iraqi Shawarma Beef", desc: "Saaj Bread With Tahina, Pickle & Vegi Fries", price: "Rs. 1199" },
      ]
    },
    {
      category: "BROAST",
      items: [
        { name: "Quarter Broast", desc: "2 Pcs Chicken, Fries, Bread, Garlic Sauce", price: "Rs. 649" },
        { name: "Half Broast", desc: "4 Pcs Chicken, Fries, 2 Bread, 2 Garlic Sauce", price: "Rs. 1249" },
        { name: "Full Broast", desc: "8 Pcs Chicken, Fries, 3 Bread, 3 Garlic Sauce", price: "Rs. 2399" },
      ]
    },
    {
      category: "PLATTERS",
      items: [
        { name: "Shawarma Arabi Chicken", price: "Rs. 949" },
        { name: "Shawarma Arabi Beef", price: "Rs. 1499" },
        { name: "Sahan Shawarma Chicken", price: "Rs. 1049" },
        { name: "Sahan Shawarma Beef", price: "Rs. 1549" },
        { name: "Belly Bros Special Platter", price: "Rs. 1999" },
      ]
    }
  ],
  footer: {
    copyright: "© 2024 BELLY BRO'S",
    subtext: "NO DIET, JUST BITE",
  }
};

export const typedSiteConfig: {
  brand: any;
  hero: any;
  verdict: any;
  links: any;
  menu: MenuCategory[];
  footer: any;
} = siteConfig;

export type SiteConfig = typeof siteConfig;
