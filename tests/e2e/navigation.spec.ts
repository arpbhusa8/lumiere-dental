import { test, expect } from "@playwright/test";

const ROUTES = [
  { path: "/", heading: /ajit yadav/i },
  { path: "/services", heading: /specialist care/i },
  { path: "/team", heading: /teach the work/i },
  { path: "/about", heading: /rooted in dharan/i },
  { path: "/contact", heading: /consultant clinic/i },
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
    // Assert the page's real (visible) heading. Auth pages render a decorative
    // <h1> inside a `hidden lg:flex` aside, so a bare h1/h2 `.first()` would grab
    // a mobile-hidden element — match by accessible name instead.
    await expect(page.getByRole("heading", { name: r.heading }).first()).toBeVisible();
    const noisy = /devtools|favicon|hydrat|script tag while rendering|Failed to load resource|404/i;
    expect(errors.filter((e) => !noisy.test(e))).toEqual([]);
  });
}
