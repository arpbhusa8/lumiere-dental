import { test, expect } from "@playwright/test";

test.describe("Booking flow", () => {
  test("walks through all 5 steps and submits a reservation", async ({ page }) => {
    await page.goto("/booking");
    await expect(page.getByRole("heading", { name: /Reserve your/i })).toBeVisible();

    // Step 1: patient type
    await page.getByRole("button", { name: /new to Om Sai/i }).click();
    await page.getByRole("button", { name: /^Continue/i }).click();

    // Step 2: pick first service
    await expect(page.getByRole("heading", { name: /choose a treatment/i })).toBeVisible();
    await page.getByRole("button").filter({ hasText: /Implant|Periodontal|Routine|Examination/i }).first().click();
    await page.getByRole("button", { name: /^Continue/i }).click();

    // Step 3: date and time
    await expect(page.getByRole("heading", { name: /date and time/i })).toBeVisible();
    const dateButtons = page.locator("button").filter({ has: page.locator("text=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/i") });
    await dateButtons.first().click();
    await page.getByRole("button", { name: /^10:00$/ }).click();
    await page.getByRole("button", { name: /^Continue/i }).click();

    // Step 4: details
    await expect(page.getByRole("heading", { name: /where shall we reach you/i })).toBeVisible();
    await page.getByLabel("Full name").fill("Test Patient");
    await page.getByLabel("Phone").fill("0712345678");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByRole("button", { name: /^Continue/i }).click();

    // Step 5: review and submit
    await expect(page.getByRole("heading", { name: /final glance/i })).toBeVisible();
    await expect(page.getByText("Test Patient")).toBeVisible();
    await page.getByRole("button", { name: /reserve appointment/i }).click();

    // Confirmation
    await expect(page.getByRole("heading", { name: /reservation received/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Reference/)).toBeVisible();
  });

  test("validation prevents proceeding without selections", async ({ page }) => {
    await page.goto("/booking");
    await expect(page.getByRole("button", { name: /^Continue/i })).toBeDisabled();
  });
});
