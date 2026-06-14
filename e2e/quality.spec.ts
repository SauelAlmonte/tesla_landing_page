import { test, expect } from "@playwright/test";
import { sections } from "../src/lib/sections";

/**
 * Quality pack — the page is clean at runtime.
 *
 * @remarks
 * Tagged `@quality`. Run with `pnpm test:e2e --grep @quality`.
 * Guards two regressions:
 *
 * 1. No uncaught errors or `console.error` output.
 * 2. No `next/image` "width or height modified" aspect-ratio warning — the
 *    exact warning the Tesla logo produced before the width-pinned fix.
 */
test.describe("Runtime quality", () => {
  /**
   * Walks the full page (triggering every lazy image and Motion reveal) while
   * recording console output, then asserts the page stayed clean.
   */
  test(
    "no console errors or image aspect-ratio warnings",
    { tag: "@quality" },
    async ({ page }) => {
      const errors: string[] = [];
      const ratioWarnings: string[] = [];

      page.on("console", (message) => {
        const text = message.text();
        if (message.type() === "error") errors.push(text);
        if (/width or height modified/i.test(text)) ratioWarnings.push(text);
      });
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto("/");

      await test.step("walk every section and the footer", async () => {
        for (const section of sections) {
          await page
            .locator(`section#${section.id}`)
            .scrollIntoViewIfNeeded();
        }
        await page.locator("footer#site-footer").scrollIntoViewIfNeeded();
        // Let any deferred image-load warnings flush.
        await page.waitForTimeout(400);
      });

      expect(ratioWarnings, ratioWarnings.join("\n")).toHaveLength(0);
      expect(errors, errors.join("\n")).toHaveLength(0);
    },
  );
});
