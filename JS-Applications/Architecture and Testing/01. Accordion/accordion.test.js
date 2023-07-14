const { chromium } = require('playwright-chromium');
const { expect } = require('chai')

const host = 'http://localhost:3000'
let browser, page;

describe('E2E tests', function () {
    this.timeout(9000);
    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 500 });
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('load static page', async () => {
        await page.goto(host);
        const content = await page.textContent('.accordion .head span');
        expect(content).to.contains('Scalable Vector Graphics');
    });

    it('show more content', async () => {
        await page.goto(host)
        await page.click('#main>.accordion:first-child >> text=More')
        await page.waitForSelector('#main>.accordion:first-child >> .extra p')

        const visibilty = await page.isVisible('#main>.accordion:first-child >> .extra p')
        const buttonContent = await page.textContent('#main>.accordion:first-child >> button')

        expect(buttonContent).to.equal('Less')
        expect(visibilty).to.be.true
    })

    it('load static page', async () => {
        await page.goto(host)

        await page.click('#main>.accordion:first-child >> text=More')
        await page.waitForSelector('#main>.accordion:first-child >> .extra p')
        await page.click('#main>.accordion:first-child >> text=Less')

        const visibilty = await page.isVisible('#main>.accordion:first-child >> .extra p')

        expect(visibilty).to.be.false

    });
})