function getInfo() {
    const input = document.querySelector('input#stopId')
    const stopName = document.querySelector('div#stopName')
    const stopList = document.querySelector('ul#buses')

    stopList.innerHTML = ''

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let busStop = data

            for (let busId in busStop.buses) {
                let newLi = document.createElement('li')
                newLi.textContent = `Bus ${busId} arrives in ${busStop.buses[busId]} minutes`
                document.querySelector('ul#buses').appendChild(newLi)

                stopName.textContent = busStop.name
            }
        })
        .catch((err) => {
            console.error(err)
            stopName.textContent = 'Error'
        })
}


