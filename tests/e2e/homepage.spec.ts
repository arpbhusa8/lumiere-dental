import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders hero, treatments and CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Lumière Dental Studio/);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /book a consultation/i }).first()).toBeVisible();
    await expect(page.getByText(/featured in/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /A short, considered/i })).toBeVisible();
  });

  test("nav links route to subpages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Treatments", exact: true }).first().click();
    await expect(page).toHaveURL(/\/services/);
    await expect(page.locator("h1")).toContainText(/menu/i);
  });
});
