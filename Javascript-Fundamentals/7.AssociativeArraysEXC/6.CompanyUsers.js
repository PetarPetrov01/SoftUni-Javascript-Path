function companyUsers(input) {
    let companies = {}
    for (let el of input) {
        let [company, id] = el.split(' -> ')

        if (!companies.hasOwnProperty(company) && companies[company] !== id) {
            companies[company] = []
        }
        if (!companies[company].includes(id)) {
            companies[company].push(id)
        }
    }
    Object.entries(companies)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach((arr) => {
            console.log(arr[0]);
            for (el of arr[1]) {
                console.log(`-- ${el}`);
            }
        })
}
companyUsers([
    'SoftUni -> AA12345',
    'SoftUni -> CC12344',
    'Lenovo -> XX23456',
    'SoftUni -> AA12345',
    'Movement -> DD11111'
]
)