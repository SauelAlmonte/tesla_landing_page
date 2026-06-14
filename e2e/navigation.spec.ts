import { test, expect } from "@playwright/test";

/**
 * Responsive pack — the navigation collapses correctly across breakpoints.
 *
 * @remarks
 * Tagged `@responsive`. This single case runs under both Playwright projects
 * (`chromium` at desktop width and `mobile-chrome` on a Pixel 5) and branches
 * on the live viewport width, so one test proves both behaviours.
 */
test.describe("Responsive navigation", () => {
  /** Tailwind's `lg` breakpoint — where the full model nav appears. */
  const LG_BREAKPOINT = 1024;

  /**
   * Above `lg` the inline model links are visible; below it they collapse and
   * only the Menu button remains.
   */
  test(
    "model links show on desktop and collapse on mobile",
    { tag: "@responsive" },
    async ({ page }) => {
      await page.goto("/");
      const header = page.locator("header");
      const viewportWidth = page.viewportSize()?.width ?? 0;
      const modelLink = header.getByRole("link", { name: "Model 3" });

      await expect(
        header.getByRole("button", { name: "Menu" }),
      ).toBeVisible();

      if (viewportWidth >= LG_BREAKPOINT) {
        await expect(modelLink).toBeVisible();
      } else {
        await expect(modelLink).toBeHidden();
      }
    },
  );
});
