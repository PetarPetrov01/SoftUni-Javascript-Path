const { chromium } = require('playwright-chromium')
const { expect } = require('chai')

const host = 'http://127.0.0.1:5500/01.TestMessenger/index.html'
const DEBUG = true;
const slowMo = 600
let browser;
let page;

describe('e2e tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {})
    });

    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        page = await browser.newPage()
        await page.goto(host)
    });

    afterEach(async () => {
        await page.close()
    })


    it('loaded and show all messages', async () => {

        await page.click('#main>#controls >> #refresh')
        const content = await page.textContent(`#main >> #messages`)

        expect(content.split('\n')[0]).to.equal('Spami: Hello, are you there?')
        expect(content.split('\n')[1]).to.equal('Garry: Yep, whats up :?')
    });

    it('sending a new message', async () => {

        const author = await page.$('#main>#controls >> [name=author]')
        await author.fill('Johny')

        const message = await page.$('#main>#controls >> [name=content]')
        message.fill('Hello everyone!')

        await page.click('#main>#controls >> #submit')

        await page.click('#main>#controls >> #refresh')
        const content = await page.textContent(`#main >> #messages`)
        expect(content.split('\n').pop()).to.equal('Johny: Hello everyone!')
    })
})
