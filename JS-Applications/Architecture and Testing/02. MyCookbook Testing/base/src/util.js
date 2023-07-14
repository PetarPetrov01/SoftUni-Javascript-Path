export function addSubmitListener(form, callBackFunc) {
    debugger
    form.addEventListener('submit', (ev => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries())

        callBackFunc(data)
    }));
}
