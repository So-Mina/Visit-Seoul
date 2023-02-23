const nameElement = document.getElementById('name')
const latitudeElement = document.getElementById('latitude')
const longitudeElement = document.getElementById('longitude')

nameElement.addEventListener('blur', async (e) => {
    const {data} = await axios.get("https://geocode.maps.co/search?q=" + nameElement.value)

    latitudeElement.value = data[0].lat
    longitudeElement.value = data[0].lon
})