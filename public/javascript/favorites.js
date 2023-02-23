const fav = document.querySelectorAll('.favorite')
const placeId = document.querySelector('h1').dataset.id
// const url = 'http://localhost:3000'
const url = 'https://visit-seoul.onrender.com'

fav.forEach(f => {
  f.addEventListener('click', async (e) => {
    await axios.post(`${url}/favorites/${placeId}`)
    f.classList.toggle('fa-solid')

  })
})