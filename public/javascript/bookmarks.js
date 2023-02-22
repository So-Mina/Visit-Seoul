const toVisit = document.querySelectorAll('.bookmark')
const placeId = document.querySelector('h1').dataset.id
const url = 'http://localhost:3000'
toVisit.forEach(v => {
  v.addEventListener('click', async (e) => {
    await axios.post(`${url}/to-visit/${placeId}`)
    v.classList.toggle('fa-solid')

  })

})


