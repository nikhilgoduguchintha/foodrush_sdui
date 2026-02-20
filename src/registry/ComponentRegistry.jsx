import HeroSection from "../components/sections/HeroSection";
import PromoBanner from "../components/sections/PromoBanner";
import OrderTracker from "../components/sections/OrderTracker";
import CategoryStrip from "../components/sections/CategoryStrip";
import OnboardingChecklist from "../components/sections/OnboardingChecklist";
import ReorderStrip from "../components/sections/ReorderStrip";
import PremiumUpsell from "../components/sections/PremiumUpsell";
import CuisineGrid from "../components/sections/CuisineGrid";
import CityBanner from "../components/sections/CityBanner";
import NudgeBanner from "../components/sections/NudgeBanner";

/**
 * Registry maps server-sent "type" strings → React components.
 * Adding a new section type = add it here + create the component.
 * The renderer never needs to change.
 */
export const ComponentRegistry = {
  hero: HeroSection,
  promo: PromoBanner,
  order_tracker: OrderTracker,
  category_strip: CategoryStrip,
  checklist: OnboardingChecklist,
  reorder_strip: ReorderStrip,
  upsell: PremiumUpsell,
  cuisine_grid: CuisineGrid,
  city_banner: CityBanner,
  nudge: NudgeBanner,
};
