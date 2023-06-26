function solve() {
    const departInput = document.querySelector('div #arrive');
    const arriveInput = document.querySelector('div #depart');
    const infoSpan = document.querySelector('span.info');

    let busStop;
    let stopId = 'depot'

    async function depart() {
        let response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stopId}`);
        
        try {
            if (response.ok == false || response.status != 200) {
                departInput.setAttribute('disabled', 'disabled');
                arriveInput.setAttribute('disabled', 'disabled');
                infoSpan.textContent = 'Error'
                throw (`${response.status} : ${response.statusText}`)
            }

            busStop = await response.json();

            departInput.removeAttribute('disabled');
            arriveInput.setAttribute('disabled', 'disabled');

            infoSpan.textContent = `Next stop ${busStop.name}`;
            stopId = busStop.next;

        } catch (err) {

            console.log(err)
        }
    }

    function arrive() {
        arriveInput.removeAttribute('disabled');
        departInput.setAttribute('disabled', 'disabled');

        infoSpan.textContent = `Arriving at ${busStop.name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();