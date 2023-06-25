function loadCommits() {
    // Try it with Fetch API
    const username = document.querySelector('#username').value
    const repo = document.querySelector('#repo').value
    const commit = document.querySelector('#commits')

    let url = `https://api.github.com/repos/${username}/${repo}/commits`

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('churka')
            }

            return response.json()
        })
        .then(data => {
            console.log(data)
            console.log(data[3])
            for (let commits of data) {
                let newLi = document.createElement('li')
                newLi.textContent = `${commits.commit.author.name} : ${commits.commit.message}`
                commit.appendChild(newLi)
            }

        })
        .catch(error => {

        })
    console.log('TODO...');
}