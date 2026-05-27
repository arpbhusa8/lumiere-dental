import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/", heading: /refined/i },
  { path: "/services", heading: /menu/i },
  { path: "/team", heading: /clinicians/i },
  { path: "/about", heading: /studio/i },
  { path: "/contact", heading: /marylebone/i },
  { path: "/booking", heading: /reserve your/i },
  { path: "/login", heading: /welcome back/i },
  { path: "/signup", heading: /create your file/i },
];

for (const r of ROUTES) {
  test(`route ${r.path} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.goto(r.path);
    await expect(page.locator("h1, h2").first()).toBeVisible();
    const noisy = /devtools|favicon|hydrat|script tag while rendering|Failed to load resource|404/i;
    expect(errors.filter((e) => !noisy.test(e))).toEqual([]);
  });
}
