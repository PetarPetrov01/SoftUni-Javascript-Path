function movieInfo(input) {
    let filmsArray = []
    let filterdArr = []
    for (line of input) {

        if (line.includes('addMovie')) {
            let name = line.split('addMovie ')[1]
            filmsArray.push({ name })

        } else if (line.includes('directedBy')) {
            let [name, director] = line.split(' directedBy ')
            let movie = filmsArray.find((movieObj) => movieObj.name === name)

            if (movie) {
                movie.director = director
            }
        } else if (line.includes('onDate')) {
            let [name, date] = line.split(' onDate ')

            let movie = filmsArray.find((movieObj) => movieObj.name === name)

            if (movie) {
                movie.date = date
            }
        }
    }
    filterdArr = filmsArray.filter(el => el.name && el.director && el.date)
    for (movie of filterdArr) {
        console.log(JSON.stringify(movie));
    }
}

movieInfo([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]

)