async function loadRepos() {
	const name = document.querySelector('#username').value
	const output = document.querySelector('#repos')

	let url = `https://api.github.com/users/${name}/repos`

	try {
		const response = await fetch(url)
		if (response.ok == false) {

			throw `${response.status} : ${response.statusText}`
		} else {

			output.replaceChildren()
			const data = await response.json()

			for (let repos of data) {
				let newLi = document.createElement('li')
				newLi.innerHTML = `${repos.full_name} : <a href=${repos.html_url}>${repos.html_url}</a>`
				output.appendChild(newLi)
			}
		}
	} catch (error) {
		console.log(error)
		output.innerHTML = `<p>${error}</p>`
	}
}