import { test, expect } from "@playwright/test";
import { sections } from "../src/lib/sections";

/**
 * Content pack — every product panel renders its heading and call-to-actions.
 *
 * @remarks
 * Tagged `@content`. Run with `pnpm test:e2e --grep @content`.
 * The cases are generated from {@link sections}, the single source of truth
 * the app itself renders from, so adding a model automatically adds coverage.
 */
test.describe("Product sections", () => {
  for (const section of sections) {
    /**
     * Scrolls the panel into view (which also fires its Motion reveal) and
     * asserts the heading plus exactly two CTAs, including the primary label.
     */
    test(
      `"${section.name}" shows a heading and two CTAs`,
      { tag: "@content" },
      async ({ page }) => {
        await page.goto("/");
        const panel = page.locator(`section#${section.id}`);

        await test.step("scroll the panel into view", async () => {
          await panel.scrollIntoViewIfNeeded();
        });

        await test.step("assert heading and CTAs", async () => {
          await expect(
            panel.getByRole("heading", { level: 2, name: section.name }),
          ).toBeVisible();
          await expect(panel.getByRole("button")).toHaveCount(2);
          await expect(
            panel.getByRole("button", { name: section.cta.primary }),
          ).toBeVisible();
        });
      },
    );
  }
});
