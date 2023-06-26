async function getInfo() {
    const input = document.querySelector('input#stopId')
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${input.value}`)

    try {
        console.log(response.status)
        if (response.ok == false || Number(response.status) != 200 || input.value.trim() == '') {

            document.querySelector('div#stopName').textContent = 'Error'
            document.querySelector('ul#buses').innerHTML = ''
            throw (`${response.status} : ${response.statusText}`)
        }
        input.value = ''
        const busStop = await response.json()
        appendBusses(busStop)

    } catch (err) {
        console.log(err)
    }
}

function appendBusses(busStop) {
    document.querySelector('div#stopName').textContent = busStop.name
    for (let busId in busStop.buses) {
        let newLi = document.createElement('li')
        newLi.textContent = `Bus ${busId} arrives in ${busStop.buses[busId]} minutes`
        document.querySelector('ul#buses').appendChild(newLi)
    }
}
