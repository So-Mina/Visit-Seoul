window.addEventListener('load', () => {
    getLocation()
  })

async function getLocation() {
    const query = window.location.pathname 
    console.log(query)

    try {
       const  {data} = await axios.get(query + "/api")
       console.log("data", data.place.location.coordinates)
       const place = {lat: data.place.location.coordinates[1],lng: data.place.location.coordinates[0] }
       const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: place
      });
    } catch (error) {
        console.error(error)
    }   
}