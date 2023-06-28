const symbols = {
    'Sunny': '\u2600',
    'Partly sunny': '\u26C5',
    'Overcast': '\u2601',
    'Rain': '\u2614',
    'Degrees': '\u00B0'

}

function attachEvents() {
    const forecast = document.querySelector('div#forecast')
    document.querySelector('#submit').addEventListener('click', getWeather)

    async function getWeather() {
        const locationInput = document.querySelector('#location').value.trim()
        forecast.style.display = ''

        const response = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
        const locationsArr = await response.json() //ARRAY !!

        try {
            //ARRAY !!!!
            if (!locationsArr.some((loc) => loc.name == locationInput)) {
                throw (`The location "${locationInput}" does not exist in the forecast`)
            }

            let locCode = locationsArr.find((loc) => {
                console.log(loc)
                console.log(loc.name)
                if (loc.name == locationInput)
                    return loc.name == locationInput
            })
                .code

            console.log(locCode)

            let current = await getCurrent(locCode)
            let upcoming = await getUpcoming(locCode)

            forecast.querySelector('#current').innerHTML = ''
            forecast.querySelector('#current').appendChild(appendCurrent(current))

            forecast.querySelector('#upcoming').innerHTML = ''
            forecast.querySelector('#upcoming').appendChild(appendUpcoming(upcoming))

        } catch (err) {
            forecast.textContent = 'Error'
            console.log(err)
        }
    }
}

async function getCurrent(locationCode) {
    const response = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)

    if (response.ok == false || response.status != 200) {
        throw ('Cjerni lasasina')
    }
    return await response.json()
}

async function getUpcoming(locationCode) {
    const response = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)

    if (response.ok == false || response.status != 200) {
        throw ('belo laina')
    }
    return await response.json()
}

function appendCurrent(currentForecast) {
    let newDiv = document.createElement('div')
    newDiv.classList.add('forecasts')

    newDiv.innerHTML = `<span class="condition symbol">${symbols[currentForecast.forecast.condition]}</span>
    <span class="condition">
        <span class="forecast-data">${currentForecast.name}</span>
        <span class="forecast-data">${currentForecast.forecast.low}\u00B0/${currentForecast.forecast.high}\u00B0</span>
        <span class="forecast-data">${currentForecast.forecast.condition}</span>
    </span>`

    return newDiv
}

function appendUpcoming(upcomingForecast) {
    let newDiv = document.createElement('div')
    newDiv.classList.add('forecast-info')

    for (let day of upcomingForecast.forecast) {
        let newSpan = document.createElement('span')
        newSpan.classList.add('upcoming')

        newSpan.innerHTML = `<span class="symbol">${symbols[day.condition]}</span>
        <span class="forecast-data">${day.low}\u00B0/${day.high}\u00B0</span>
        <span class="forecast-data">${day.condition}</span>`

        newDiv.appendChild(newSpan)
    }

    return newDiv
}
attachEvents();