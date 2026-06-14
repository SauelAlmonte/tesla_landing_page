import { test, expect } from "@playwright/test";

/**
 * Smoke pack — the fastest "is the page alive?" checks.
 *
 * @remarks
 * Tagged `@smoke`. Run just this pack with:
 * `pnpm test:e2e --grep @smoke`. These assertions should hold on every
 * commit and act as the first gate before the heavier content packs.
 *
 * @see {@link ../playwright.config.ts} for the projects (desktop + mobile)
 * these run against.
 */
test.describe("Smoke", () => {
  /**
   * The home document loads and is identifiable as the Tesla landing page.
   */
  test(
    "home page loads with the Tesla title",
    { tag: "@smoke" },
    async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveTitle(/Tesla/);
    },
  );

  /**
   * The fixed navigation renders and always exposes the Menu control,
   * regardless of viewport.
   */
  test(
    "navigation bar and Menu control are present",
    { tag: "@smoke" },
    async ({ page }) => {
      await page.goto("/");
      const header = page.locator("header");
      await expect(header).toBeVisible();
      await expect(
        header.getByRole("button", { name: "Menu" }),
      ).toBeVisible();
    },
  );
});
