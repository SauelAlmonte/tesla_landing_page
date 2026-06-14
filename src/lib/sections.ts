export type Section = {
  /** DOM id, also used as the in-page anchor target. */
  id: string;
  /** Display name shown as the heading and in the navbar. */
  name: string;
  /** Path to the hero image under /public. */
  image: string;
  /** Spec-led subhead under the heading. */
  tagline: string;
  /** Labels for the two CTA buttons. */
  cta: { primary: string; secondary: string };
};

/**
 * Single source of truth for every full-screen section.
 * The page, navbar, and scroll-down chevrons are all derived from this array,
 * so adding a model is a one-object change.
 */
export const sections: Section[] = [
  {
    id: "model-s",
    name: "Model S",
    image: "/images/ModelS.jpg",
    tagline: "Plaid · 1,020 hp · 1.99s 0-60 mph",
    cta: { primary: "Custom Order", secondary: "Existing Inventory" },
  },
  {
    id: "model-3",
    name: "Model 3",
    image: "/images/Model3.jpg",
    tagline: "From $299/mo · 333 mi range",
    cta: { primary: "Custom Order", secondary: "Existing Inventory" },
  },
  {
    id: "model-x",
    name: "Model X",
    image: "/images/ModelX.jpg",
    tagline: "Falcon Wing doors · 1,020 hp · seats 7",
    cta: { primary: "Custom Order", secondary: "Existing Inventory" },
  },
  {
    id: "model-y",
    name: "Model Y",
    image: "/images/ModelY.jpg",
    tagline: "Dual Motor AWD · 330 mi range · seats 7",
    cta: { primary: "Custom Order", secondary: "Existing Inventory" },
  },
  {
    id: "solar-roof",
    name: "Solar Roof",
    image: "/images/SolarRoof.jpg",
    tagline: "Generate clean energy from your roof",
    cta: { primary: "Order Now", secondary: "Learn More" },
  },
  {
    id: "solar-panels",
    name: "Solar Panels",
    image: "/images/SolarPanels.jpg",
    tagline: "Lowest-cost solar panels in America",
    cta: { primary: "Order Now", secondary: "Learn More" },
  },
];
