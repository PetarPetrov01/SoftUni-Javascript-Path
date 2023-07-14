//@ts-check
const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = require('./mock-data.json')

const host = 'http://localhost:5500/index.html'
const DEBUG = false;
let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo: 1000 } : {});

    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();

        // block intensive resources and external calls (page routes take precedence)
        // await context.route('**/*.{png,jpg,jpeg}', route => route.abort());
        // await context.route(url => {
        //     return url.hostname != 'localhost';
        // }, route => route.abort());

        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    describe('Catalog', () => {
        it('loads the content of the API', async () => {
            await page.goto(host)
            const recipes = await page.$$eval('main >> #catalog >>h2', n => n.map((n) => n.textContent))

            expect(recipes).to.contains(mockData.list[0].name)
            expect(recipes).to.contains(mockData.list[1].name)
            expect(recipes).to.contains(mockData.list[2].name)
        })

        it('Displays recipe details', async () => {
            await page.goto(host)

            await page.click('main>#catalog >> text=Easy Lasagna')
            await page.waitForSelector('main>#details>article')

            const recipe = await page.textContent('main>#details>article >> h2')
            expect(recipe).to.equal(mockData.list[0].name)

            const ingredients = await page.$$eval('main>#details >> ul >>li', n => n.map(n => n.textContent))
            expect(ingredients.join('\n')).to.equal(mockData.details.ingredients.join('\n'))
        })
    })

    describe('Authentication', () => {
        it('Login makes correct API call', async () => {
            await page.goto(host)
            await page.click('nav>div#guest >> text=Login')

            await page.waitForSelector('main>#login >> form')

            await page.fill('input[name=email]', 'peter@abv.bg')
            await page.fill('input[name=password]', '123456')

            let [response] = await Promise.all([
                page.waitForResponse('**/*'),
                page.click('main>#login >> form >> input[type=submit]')
            ])

            response = await response.json()

            expect(response.email).to.equal('peter@abv.bg')
            expect(response.username).to.equal('Peter')
        })

        it.only('Regsiter makes correct API call', async () => {
            await page.goto(host)
            await page.click('nav>div#guest >> text=Register')

            await page.waitForSelector('main>#register >> form')

            await page.fill('input[name=email]', 'ivan@abv.bg')
            await page.fill('input[name=password]', '123456')
            await page.fill('input[name=rePass]', '123456')

            let [response] = await Promise.all([
                page.waitForResponse('**/*'),
                page.click('main>#register >> form >> input[type=submit]')
            ])

            response = await response.json()
            console.log(response)
            expect(response.email).to.equal('ivan@abv.bg')
        })
    })

});
