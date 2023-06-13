function loadRepos() {
   console.log('repos')
   let url = `https://api.github.com/users/testnakov/repos`

   const request = new XMLHttpRequest()

   request.addEventListener('readystatechange', displayRepo)
   request.open('GET', url)
   request.send()

   function displayRepo() {
      if (request.readyState = 4 && request.status == 200) {
         document.querySelector('#res').textContent = request.responseText
      }
   }
}