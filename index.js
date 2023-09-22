//extraer de un archivo diferente
const secret_api = 'ENTER_YOUR_API'                                
const bypass_cors_url = 'at_26lHGdLzOPNEtc4KIxCJauLIHt9Se'                                                     //'https://cors-anywhere.herokuapp.com'
const api_uri = 'https://geo.ipify.org/api'
let current_verion = 'v2'

//elementos a actualizar
let actual_ip = document.getElementById('actual_ip')
let actual_ciudad = document.getElementById('actual_ciudad')
let actual_zone = document.getElementById('actual_zone')
let actual_isp = document.getElementById('actual_isp')

//elementos de formulario
const entered_ip = document.getElementById('ip_address')
const btn_search = document.getElementById('btn_search')

const headers_option = {
    headers: {
        'access-control-allow-origin': '*',
    }
}

const map = L.map('display_map',{
    'center':[0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    ]
})

updateMarker = (update_Marker = [-42, 42])=> {
    map.setView(update_Marker, 13)
    L.marker(update_Marker).addto(map)
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = '${bypass_cors_url}${api_uri}${current_verion}?apikey=${secret_api}'
    }
    else{
        var ip_url = '${bypass_cors_url}${api_uri}${current_verion}?apikey=${secret_api}&ipAddress=${default_ip}'
    }    


    fetch(ip_url, headers_option)
    .then(results => results.json())
    .then(data => {
    actual_ip.innerHTML = data.ip
    actual_ciudad.innerHTML = data.location.city //'${data.location.city}${data.location.country}${data.location.postalcode}'
    actual_zone.innerHTML = data.location.timezone
    actual_isp.innerHTML = data.isp

    updateMarker([data.location.lat, data.location.lng])

    })
    .catch(error => alert("algo salió mal."))

}

getIPDetails()

document.addEventListener('load', updateMarker())

btn_search.addEventListener('click', e => {
    e.preventDefault()
    if(entered_ip.value != '' && entered_ip.value !=null){
        getIPDetails(entered_ip.value)
        return

    }
    alert("por favor, introduzca una dirección ip válida")
})
/*const apiKey = 'at_26lHGdLzOPNEtc4KIxCJauLIHt9Se'*/
//la url para la petición es : https://geo.ipify.org/api/v2/country?apiKey=apikey&ipAddress=8.8.8.8
// recuerda que el ipAddress en la petición es dinámico, es decir, es el ip que el usuario ingrese en el input
