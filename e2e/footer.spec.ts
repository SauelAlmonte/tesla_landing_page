import { test, expect } from "@playwright/test";

/**
 * Content pack — the closing footer.
 *
 * @remarks
 * Tagged `@content`. Verifies the four link columns and the honest
 * "demo project" disclaimer that keeps this clone clearly unofficial.
 */
test.describe("Footer", () => {
  /** Column headings that anchor the footer's navigation. */
  const columnHeadings = ["Vehicles", "Energy", "Charging", "Company"] as const;

  /**
   * Scrolls to the footer and asserts every column heading plus the
   * non-affiliation disclaimer are visible.
   */
  test(
    "renders link columns and the demo disclaimer",
    { tag: "@content" },
    async ({ page }) => {
      await page.goto("/");
      const footer = page.locator("footer#site-footer");
      await footer.scrollIntoViewIfNeeded();

      for (const heading of columnHeadings) {
        await expect(
          footer.getByRole("heading", { level: 2, name: heading }),
        ).toBeVisible();
      }
      await expect(footer.getByText(/Demo project/i)).toBeVisible();
    },
  );
});
