import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("login page renders and submits magic-link form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: /welcome back/i })).toBeVisible();
    await page.getByLabel("Email").fill(`omsai+${Date.now()}@example.com`);
    await page.getByRole("button", { name: /send magic link/i }).click();
    // Either success (inbox screen) or a toast (rate-limit/invalid email) — both prove the form submitted.
    await Promise.race([
      page.getByRole("heading", { name: /check your inbox/i }).waitFor({ timeout: 15_000 }),
      page.getByText(/Could not send|rate limit|invalid/i).first().waitFor({ timeout: 15_000 }),
    ]);
  });

  test("signup collects name + email and submits", async ({ page }) => {
    await page.goto("/signup");
    await expect(page.getByRole("heading", { name: /create your file/i })).toBeVisible();
    await page.getByLabel("Full name").fill("Jane Worthington");
    await page.getByLabel("Email").fill(`omsai+${Date.now()}@example.com`);
    await page.getByRole("button", { name: /create account/i }).click();
    await Promise.race([
      page.getByRole("heading", { name: /check your inbox/i }).waitFor({ timeout: 15_000 }),
      page.getByText(/Could not send|rate limit|invalid/i).first().waitFor({ timeout: 15_000 }),
    ]);
  });

  test("dashboard redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});
