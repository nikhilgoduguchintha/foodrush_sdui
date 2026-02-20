import { evaluateRule } from "./ruleEvaluator";

/**
 * This simulates what a real backend does:
 * - Receives user context (age, city, plan, etc.)
 * - Has a giant JSON config of all possible sections with rule trees
 * - Returns ONLY the sections that pass their rules
 *
 * In production: this JSON config lives in a CMS/DB,
 * and this entire function is an API endpoint.
 */

const SECTION_DEFINITIONS = [
  // ── 1. HERO BANNER
  {
    id: "hero_banner",
    type: "hero",
    rules: { all: [] }, // always visible
    resolveProps: (ctx) =>
      ctx.isPremium
        ? {
            variant: "premium",
            title: "Welcome back, Premium ⭐",
            sub: "Free delivery on all orders today",
            badge: "PREMIUM MEMBER",
            from: "#0f0c29",
            to: "#302b63",
          }
        : ctx.isNewUser
        ? {
            variant: "new",
            title: "Welcome to FoodRush! 🎉",
            sub: "60% off your first 3 orders",
            badge: "NEW USER OFFER",
            from: "#0a2342",
            to: "#1565C0",
          }
        : {
            variant: "regular",
            title: "Good to see you again 👋",
            sub: "Your favourites are waiting",
            badge: "WELCOME BACK",
            from: "#1a1a2e",
            to: "#16213e",
          },
  },

  // ── 2. ACTIVE ORDER TRACKER
  {
    id: "active_order",
    type: "order_tracker",
    rules: { fact: "hasActiveOrder", operator: "eq", value: true },
    resolveProps: () => ({
      restaurant: "Meghana Foods",
      eta: "12 min",
      step: 2,
    }),
  },

  // ── 3. ALCOHOL BANNER — age + city + time
  {
    id: "alcohol_banner",
    type: "promo",
    rules: {
      all: [
        { fact: "age", operator: "gte", value: 21 },
        {
          fact: "city",
          operator: "in",
          value: [
            "Mumbai",
            "Bangalore",
            "Hyderabad",
            "Delhi",
            "Pune",
            "Chennai",
          ],
        },
        { fact: "hour", operator: "between", value: [11, 23] },
      ],
    },
    resolveProps: (ctx) => ({
      icon: "🍺",
      label: "DRINKS",
      title: "Beer & Spirits in 30 min",
      sub: `Available in ${ctx.city} • Orders before midnight`,
      accent: "#f59e0b",
      bg: "#1c1007",
    }),
  },

  // ── 4. LATE NIGHT — 11pm to 4am
  {
    id: "late_night_banner",
    type: "promo",
    rules: {
      any: [
        { fact: "hour", operator: "gte", value: 23 },
        { fact: "hour", operator: "lte", value: 4 },
      ],
    },
    resolveProps: () => ({
      icon: "🦉",
      label: "MIDNIGHT MUNCHIES",
      title: "Craving something late?",
      sub: "Restaurants open 24/7 near you",
      accent: "#818cf8",
      bg: "#0f0b1e",
    }),
  },

  // ── 5. BREAKFAST — 6am to 10am
  {
    id: "breakfast_banner",
    type: "promo",
    rules: { fact: "hour", operator: "between", value: [6, 10] },
    resolveProps: () => ({
      icon: "☀️",
      label: "GOOD MORNING",
      title: "Fresh breakfast delivered",
      sub: "Idli, Dosa, Parathas ready now",
      accent: "#fbbf24",
      bg: "#1c1400",
    }),
  },

  // ── 6. LUNCH RUSH — 12pm to 2pm
  {
    id: "lunch_rush_banner",
    type: "promo",
    rules: { fact: "hour", operator: "between", value: [12, 14] },
    resolveProps: () => ({
      icon: "🍱",
      label: "LUNCH RUSH",
      title: "Office lunch? We got you",
      sub: "Express delivery in 20 min",
      accent: "#34d399",
      bg: "#021c10",
    }),
  },
  // ── 7. SUPER SAVER BANNER — complex nested AND + OR
  {
    id: "super_saver_banner",
    type: "promo",
    rules: {
      all: [
        { fact: "isPremium", operator: "eq", value: false },
        {
          any: [
            // new user path
            {
              all: [
                { fact: "isNewUser", operator: "eq", value: true },
                { fact: "orderCount", operator: "eq", value: 0 },
              ],
            },
            // lapsed user path
            {
              all: [
                { fact: "isNewUser", operator: "eq", value: false },
                { fact: "orderCount", operator: "between", value: [1, 3] },
                {
                  any: [
                    { fact: "hour", operator: "between", value: [12, 14] },
                    { fact: "hour", operator: "between", value: [19, 22] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    resolveProps: (ctx) => ({
      icon: "💰",
      label: "SUPER SAVER",
      title: ctx.isNewUser
        ? "60% off your first order!"
        : "You haven't ordered in a while — here's a deal",
      sub: ctx.isNewUser
        ? "Limited time welcome offer"
        : "Extra 30% off valid for next 2 hours",
      accent: "#22c55e",
      bg: "#021c10",
    }),
  },

  // ── 8. PURE VEG STRIP — veg diet OR specific cities
  {
    id: "veg_strip",
    type: "category_strip",
    rules: {
      any: [
        { fact: "dietType", operator: "eq", value: "veg" },
        {
          fact: "city",
          operator: "in",
          value: ["Ahmedabad", "Surat", "Jaipur"],
        },
      ],
    },
    resolveProps: () => ({
      title: "🥦 Pure Veg Restaurants",
      filter: "veg",
      accent: "#22c55e",
    }),
  },

  // ── 9. ONBOARDING CHECKLIST — new user, never ordered
  {
    id: "onboarding_checklist",
    type: "checklist",
    rules: {
      all: [
        { fact: "isNewUser", operator: "eq", value: true },
        { fact: "orderCount", operator: "eq", value: 0 },
      ],
    },
    resolveProps: () => ({
      title: "Get started — earn ₹200 cashback",
      steps: [
        { label: "Add your address", done: true },
        { label: "Place your first order", done: false },
        { label: "Rate the restaurant", done: false },
      ],
    }),
  },

  // ── 10. REORDER STRIP — returning users with history
  {
    id: "reorder_strip",
    type: "reorder_strip",
    rules: {
      all: [
        { fact: "isNewUser", operator: "eq", value: false },
        { fact: "orderCount", operator: "gt", value: 0 },
      ],
    },
    resolveProps: () => ({
      title: "Order again",
      items: [
        { name: "Meghana Foods", item: "Biryani", price: 349, img: "🍛" },
        { name: "Domino's", item: "Pepperoni Pizza", price: 449, img: "🍕" },
        { name: "Chai Point", item: "Masala Chai", price: 59, img: "☕" },
      ],
    }),
  },

  // ── 11. PREMIUM UPSELL — non-premium with engagement
  {
    id: "premium_upsell",
    type: "upsell",
    rules: {
      all: [
        { fact: "isPremium", operator: "eq", value: false },
        { fact: "orderCount", operator: "gte", value: 2 },
      ],
    },
    resolveProps: () => ({
      title: "Try FoodRush Pro free for 30 days",
      perks: ["Free delivery always", "Priority support", "Exclusive deals"],
      cta: "Activate Free Trial",
    }),
  },

  // ── 12. CUISINE GRID — everyone (content varies by diet)
  {
    id: "cuisine_grid",
    type: "cuisine_grid",
    rules: { all: [] },
    resolveProps: (ctx) => ({
      title:
        ctx.dietType === "veg"
          ? "Popular Veg Cuisines"
          : "What are you craving?",
      items:
        ctx.dietType === "veg"
          ? [
              "🥗 Salads",
              "🫓 Sandwiches",
              "🍜 Noodles",
              "🧆 Falafel",
              "🥞 Pancakes",
              "🌮 Veg Tacos",
            ]
          : [
              "🍛 Biryani",
              "🍕 Pizza",
              "🍔 Burgers",
              "🍜 Noodles",
              "🌮 Tacos",
              "🍱 Sushi",
            ],
    }),
  },

  // ── 13. CITY BANNER — metro cities only
  {
    id: "city_special_banner",
    type: "city_banner",
    rules: {
      fact: "city",
      operator: "in",
      value: ["Mumbai", "Bangalore", "Hyderabad"],
    },
    resolveProps: (ctx) =>
      ({
        Mumbai: {
          title: "Vada Pav & More",
          sub: "Mumbai street food delivered",
          icon: "🌆",
        },
        Bangalore: {
          title: "Filter Coffee & Dosas",
          sub: "Bangalore favourites near you",
          icon: "🌇",
        },
        Hyderabad: {
          title: "Dum Biryani Specials",
          sub: "Authentic Hyderabadi flavours",
          icon: "🏙️",
        },
      }[ctx.city]),
  },

  // ── 14. RATING NUDGE — users who haven't rated yet
  {
    id: "rating_nudge",
    type: "nudge",
    rules: {
      all: [
        { fact: "isNewUser", operator: "eq", value: false },
        { fact: "orderCount", operator: "between", value: [1, 3] },
      ],
    },
    resolveProps: () => ({
      msg: "Rate your last order from Meghana Foods — takes 5 seconds!",
      icon: "⭐",
    }),
  },
];

/** The main export — simulates an API call */
export function fetchLayoutFromServer(userContext) {
  return SECTION_DEFINITIONS.filter((section) =>
    evaluateRule(section.rules, userContext)
  ).map((section) => ({
    id: section.id,
    type: section.type,
    props: section.resolveProps(userContext),
  }));
}
