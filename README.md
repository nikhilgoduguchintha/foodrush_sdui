# FoodRush SDUI

A working demonstration of **Server-Driven UI (SDUI)** — the architecture used by Swiggy, Zomato, Airbnb, Uber and Netflix to render dynamic home screens without app updates.

---

## What is SDUI?

Instead of hardcoding rules like `if (age > 21) showAlcoholBanner()` in the frontend, the **server evaluates all conditions and sends back a JSON layout** describing exactly what to render. The frontend is a dumb renderer — it just maps JSON to components.

```js
// Frontend does only this
const sections = await fetch("/api/home-layout").then((r) => r.json());
<SDUIRenderer sections={sections} />;
```

---

## Project Structure

```
src/
├── engine/                         ← Simulated backend (real app: this is an API)
│   ├── ruleEvaluator.js            ← Binary tree rule evaluator
│   └── serverLayout.js             ← 14 section definitions + layout resolver
│
├── registry/
│   └── ComponentRegistry.jsx       ← Maps type string → React component
│
├── components/
│   ├── sections/                   ← UI components (know nothing about rules)
│   │   ├── HeroSection.jsx
│   │   ├── PromoBanner.jsx
│   │   ├── OrderTracker.jsx
│   │   ├── ReorderStrip.jsx
│   │   ├── CuisineGrid.jsx
│   │   ├── OnboardingChecklist.jsx
│   │   ├── PremiumUpsell.jsx
│   │   ├── CategoryStrip.jsx
│   │   ├── CityBanner.jsx
│   │   └── NudgeBanner.jsx
│   ├── renderer/
│   │   └── SDUIRenderer.jsx        ← Dumb renderer — loops sections, renders components
│   └── devtools/
│       ├── ControlPanel.jsx        ← Simulate different user contexts
│       └── JSONInspector.jsx       ← Inspect raw server response
│
├── hooks/
│   └── useSDUI.js                  ← Fetches layout, manages loading state
│
└── App.jsx
```

> **Note:** In a real production app, the `engine/` folder does not exist in the frontend. It lives on the backend (Node.js / Java / Python) and `useSDUI.js` simply calls `fetch('/api/home-layout')`.

---

## How It Works

```
User opens app
  → useSDUI hook fires
  → fetchLayoutFromServer(userContext)
      → evaluateRule(rules, ctx) runs for each of 14 sections    ← binary tree traversal
      → sections that pass their rules are kept
      → resolveProps(ctx) runs for surviving sections
      → returns plain JSON array
  → setSections(result)
  → SDUIRenderer maps type → ComponentRegistry → renders component
  → React diffs using stable key={section.id} — only changed sections update
```

---

## The Rule Engine

`evaluateRule` is a recursive function that traverses a rule tree and returns `true` or `false`:

```js
function evaluateRule(node, ctx) {
  if (!node) return true; // no rules = always show
  if (node.fact) return evaluateCondition(node, ctx); // leaf node
  if (node.all) return node.all.every((child) => evaluateRule(child, ctx)); // AND
  if (node.any) return node.any.some((child) => evaluateRule(child, ctx)); // OR
  if (node.none) return node.none.every((child) => !evaluateRule(child, ctx)); // NOT
}
```

### Rule Examples

**Simple — single condition**

```js
rules: { fact: 'hasActiveOrder', operator: 'eq', value: true }
```

**AND — all must pass**

```js
rules: {
  all: [
    { fact: "age", operator: "gte", value: 21 },
    {
      fact: "city",
      operator: "in",
      value: ["Mumbai", "Bangalore", "Hyderabad"],
    },
    { fact: "hour", operator: "between", value: [11, 23] },
  ];
}
```

**Complex nested AND + OR**

```js
rules: {
  all: [
    { fact: "isPremium", operator: "eq", value: false },
    {
      any: [
        {
          all: [
            // new user path
            { fact: "isNewUser", operator: "eq", value: true },
            { fact: "orderCount", operator: "eq", value: 0 },
          ],
        },
        {
          all: [
            // lapsed user at meal time
            { fact: "isNewUser", operator: "eq", value: false },
            { fact: "orderCount", operator: "between", value: [1, 3] },
            {
              any: [
                { fact: "hour", operator: "between", value: [12, 14] }, // lunch
                { fact: "hour", operator: "between", value: [19, 22] }, // dinner
              ],
            },
          ],
        },
      ],
    },
  ];
}
```

---

## Sections & Rules

| Section                | Visible When                                         |
| ---------------------- | ---------------------------------------------------- |
| `hero_banner`          | Always — 3 variants (premium / new user / returning) |
| `active_order`         | `hasActiveOrder === true`                            |
| `alcohol_banner`       | `age >= 21` AND metro city AND `hour` 11–23          |
| `late_night_banner`    | `hour >= 23` OR `hour <= 4`                          |
| `breakfast_banner`     | `hour` between 6–10                                  |
| `lunch_rush_banner`    | `hour` between 12–14                                 |
| `veg_strip`            | `dietType === veg` OR city in Gujarat/Rajasthan      |
| `onboarding_checklist` | `isNewUser === true` AND `orderCount === 0`          |
| `reorder_strip`        | `isNewUser === false` AND `orderCount > 0`           |
| `premium_upsell`       | `isPremium === false` AND `orderCount >= 2`          |
| `cuisine_grid`         | Always — content varies by diet type                 |
| `city_special_banner`  | City in Mumbai / Bangalore / Hyderabad               |
| `rating_nudge`         | Returning user AND `orderCount` between 1–3          |
| `super_saver_banner`   | Not premium + (new user OR lapsed user at meal time) |

---

## Adding a New Section

Only 3 files need to change. Everything else stays untouched.

**1. Add definition in `serverLayout.js`**

```js
{
  id: 'flash_sale_banner',
  type: 'flash_sale',
  rules: {
    all: [
      { fact: 'isPremium',  operator: 'eq',  value: false },
      { fact: 'orderCount', operator: 'gte', value: 5 },
    ]
  },
  resolveProps: () => ({ title: '⚡ Flash Sale!', discount: '40%' }),
},
```

**2. Create `components/sections/FlashSaleBanner.jsx`**

```jsx
export default function FlashSaleBanner({ title, discount }) {
  return (
    <div>
      {title} — {discount} off
    </div>
  );
}
```

**3. Register in `ComponentRegistry.jsx`**

```js
import FlashSaleBanner from "../components/sections/FlashSaleBanner";

export const ComponentRegistry = {
  // ... existing
  flash_sale: FlashSaleBanner,
};
```

`SDUIRenderer`, `useSDUI`, and `App.jsx` — **never change**.

---

## Getting Started

```bash
git clone https://github.com/your-username/foodrush-sdui
cd foodrush-sdui
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) and use the **User Context panel** on the right to simulate different users and watch the layout update in real time.

---

## Key Concepts

| Concept                            | Where                                  |
| ---------------------------------- | -------------------------------------- |
| Recursive rule evaluation          | `engine/ruleEvaluator.js`              |
| Section definitions + resolveProps | `engine/serverLayout.js`               |
| Dumb renderer pattern              | `components/renderer/SDUIRenderer.jsx` |
| Stable key diffing                 | `key={section.id}` in SDUIRenderer     |
| Loading state management           | `hooks/useSDUI.js`                     |
| Object bracket notation lookup     | `resolveProps` in city_special_banner  |
