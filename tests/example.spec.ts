import { test, expect } from '@playwright/test';

const baseUrl = process.env.NEXT_PUBLIC_FRONT_URL || 'http://localhost:3000';

test('should home page have good metadata', async ({ page }) => {
  await page.goto(baseUrl);
  await expect(page).toHaveTitle(/Techos.Dev/);
});




test('should all post links works and have only one H1 tag', async ({ page }) => {
  const prefix = '/post'
  await page.goto(baseUrl);

  const links = await page.locator(`a[href*="${prefix}"]`).all()

  const hrefs = await Promise.all(links.map(async (link: any) => {

    expect(await link.getAttribute('href')).toContain(prefix)
    expect(await link.getAttribute('aria-label')).toBeDefined()


    return {
      href: await link.getAttribute('href'),
      text: await link.getAttribute('aria-label')
    };
  }))


  for (let i = 0; i < hrefs.length; i++) {
    console.log('hrefs:', hrefs)
    await page.click(`a[href="${hrefs[i].href}"]`);
    await expect(page).toHaveURL(`${baseUrl}${hrefs[i].href}`)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toContainText(hrefs[i].text!)
    await page.goBack()
  }
});

test('should all tag links works and have only one H1 tag', async ({ page }) => {
  const prefix = '/tag'
  await page.goto(baseUrl);

  const links = await page.locator(`a[href*="${prefix}"]`).all()

  const hrefs = await Promise.all(links.map(async (link: any) => {

    expect(await link.getAttribute('href')).toContain(prefix)
    expect(await link.getAttribute('aria-label')).toBeDefined()


    return {
      href: await link.getAttribute('href'),
      text: await link.getAttribute('aria-label')
    };
  }))

  const done: string[] = []

  for (let i = 0; i < hrefs.length; i++) {
    if (done.includes(hrefs[i].href)) continue
    done.push(hrefs[i].href)
    console.log('hrefs:', hrefs)
    await page.locator(`a[href="${hrefs[i].href}"]`).first().click();
    await expect(page).toHaveURL(`${baseUrl}${hrefs[i].href}`)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toContainText(hrefs[i].text!)
    await page.goBack()
  }
});
