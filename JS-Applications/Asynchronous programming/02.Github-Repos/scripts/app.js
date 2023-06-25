function loadRepos() {
	const name = document.querySelector('#username').value
	const output = document.querySelector('#repos')

	let url = `https://api.github.com/users/${name}/repos`

	fetch(url)
		.then(response => {
			output.replaceChildren()
			if (!response.ok) {
				return Promise.reject(`${response.status} : ${response.statusText}`)
			}
			return response.json()
		})
		.then(data => {
			for (let repos of data) {
				let newLi = document.createElement('li')
				newLi.innerHTML = `${repos.full_name} : <a href=${repos.html_url}>${repos.html_url}</a>`
				output.appendChild(newLi)
			}
		})
		.catch(error => {
			output.innerHTML = `${error}`
		})
}