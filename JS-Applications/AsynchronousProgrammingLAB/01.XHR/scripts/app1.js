function loadRepos() {
   console.log('repos')
   let url = `https://api.github.com/users/testnakov/repos`

   fetch(url)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         document.querySelector('#res').textContent = JSON.stringify(data)
      })
}