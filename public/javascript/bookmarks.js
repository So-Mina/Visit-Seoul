const marked = document.querySelectorAll('.to-visit')
const placeId = document.querySelector('h1').dataset.id
// const url = 'http://localhost:3000'
const url = "https://visit-seoul.onrender.com"

marked.forEach(v => {
  v.addEventListener('click', async (e) => {
    await axios.post(`${url}/to-visit/${placeId}`)
    v.classList.toggle('fa-solid')

  })

})