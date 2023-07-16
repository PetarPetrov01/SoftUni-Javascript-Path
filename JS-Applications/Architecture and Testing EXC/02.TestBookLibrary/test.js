const { chromium } = require('playwright-chromium')
const { expect } = require('chai')

const host = 'http://127.0.0.1:5500/02.TestBookLibrary/index.html'
const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    }, "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}

const DEBUG = true;
const slowMo = 600
let browser;
let page;

describe('e2e tests', function () {
    this.timeout(10000);

    before(async () => {
        browser = await chromium.launch(DEBUG ? { headless: false, slowMo } : {})
    });

    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        page = await browser.newPage()

    });

    afterEach(async () => {
        await page.close()
    })

    describe('load book', () => {

        it('load book', async () => {
            await page.route('**/jsonstore/collections/books', (route, request) => {
                route.fulfill({
                    body: JSON.stringify(mockData),
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Content-Type": 'application/json'
                    }
                })
            })

            await page.goto(host)

            await page.click('body >> #loadBooks')
            await page.waitForSelector('body>table>tbody >> td')

            const books = await page.$$eval(`tbody tr`, (t) => t.map((s) => s.textContent));

            expect(books[0]).to.include('Harry Potter and the Philosopher\'s Stone')
            expect(books[0]).to.include('J.K.Rowling')
            expect(books[1]).to.include('C#')
            expect(books[1]).to.include('Nakov')
        });
    })

    describe('add book', () => {
        it('non filled inputs', async () => {
            await page.goto(host)
            await page.fill('input[name=title]', 'BLack')

            await page.goto(host)

            await page.click('body >> #loadBooks')
            await page.waitForSelector('body>table>tbody >> td')

            const books = await page.$$eval(`tbody tr`, (t) => t.map((s) => s.textContent));

            expect(books.length).to.equal(2)
        })

        it('right request body', async () => {
            await page.goto(host)

            await page.fill('input[name=title]', 'BLack')
            await page.fill('input[name=author]', 'Johny')

            const [request] = await Promise.all([
                page.waitForRequest('**/*'),
                page.click('text=Submit')
            ])

            expect(request.postData()).to.equal('{"author":"Johny","title":"BLack"}')

            const books = await page.$$eval(`tbody tr`, (t) => t.map((s) => s.textContent));

            expect(books.length).to.equal(3)

        })
    })

    it('edit book', async () => {


    })
    it('delete book', async () => {


    })
})