class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName
        this.ticketPrice = Number(ticketPrice)
        this.screenings = []
        this.totalProfit = 0
        this.totalTicketsSold = 0

    }
    newScreening(date, hall, description) {

        if (this.screenings.some(el => el.date == date && el.hall == hall)) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`)
        } else {
            this.screenings.push({ date, hall, description })
            return `New screening of ${this.movieName} is added.`
        }
    }

    endScreening(date, hall, soldTickets) {
        if (this.screenings.some(el => el.date == date && el.hall == hall)) {
            let currentProfit = Number(soldTickets) * this.ticketPrice
            this.totalProfit += currentProfit

            let currentIndex = this.screenings.findIndex(el => el.date == date && el.hall == hall)
            this.screenings.splice(currentIndex, 1)

            this.totalTicketsSold += Number(soldTickets)

            return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`
        } else {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`)
        }
    }

    toString() {
        let output = `${this.movieName} full information:`
        output += `\nTotal profit: ${this.totalProfit.toFixed(0)}$\nSold Tickets: ${this.totalTicketsSold}`

        if (this.screenings.length > 0) {
            output += `\nRemaining film screenings:`
            this.screenings
                .sort((a, b) => {
                    return a.hall.localeCompare(b.hall)
                })
                .forEach(el => output += `\n${el.hall} - ${el.date} - ${el.description}`)
        } else {
            output += "\nNo more screenings!"
        }
        return output
    }
}

let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));
console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.toString());

m.newScreening('October 4, 2020', '235', `regular`);
m.newScreening('October 5, 2020', 'Main', `regular`);
m.newScreening('October 3, 2020', '235', `regular`);
m.newScreening('October 4, 2020', 'Main', `regular`);
console.log(m.toString());
