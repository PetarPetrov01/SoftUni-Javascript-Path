export async function getTable() {
    try {
        const response = await fetch('http://localhost:3030/jsonstore/advanced/table')

        if (response.ok == false) {
            const err = response.json()
            throw new Error(err.message)
        }

        return await response.json()
    } catch (error) {
        alert(error.message)
    }
}