/*
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
*/

var Local=document.getElementById("#local-atual");

var Local = document.getElementById("local-atual");

function loc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (posicao) {
      let lat1 = posicao.coords.latitude;
      let lon1 = posicao.coords.longitude;

      let distancia = calcular(lat1, lon1);
      console.log(distancia);
      document.getElementById("mostrar-dist").innerHTML =
        "Você está a " + (distancia.toFixed (4))  + "km de distância de um exemplar";
    }, showError);
  } else {
    Local.innerHTML = "Geolocalização não é suportada nesse browser.";
  }
}

function calcular(lat1, lon1) {
  /* Parque do Carmo, São Paulo */
  let lat2 = 23.5725;
  let lon2 = 46.4618;
  const radlat1 = Math.PI * lat1 / 180;
  const radlat2 = Math.PI * lat2 / 180;
  const radlon1 = Math.PI * lon1 / 180;
  const radlon2 = Math.PI * lon2 / 180;
  const theta = lon1 - lon2;
  const radtheta = Math.PI * theta / 180;

  // Fórmula de haversine
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  // Aplica arco cosseno para obter o ângulo
  dist = Math.acos(dist);

  // Converte o ângulo de radianos para graus
  dist = dist * 180 / Math.PI;

  // Converte os graus para minutos e multiplica pela constante para obter a distância em quilômetros
  dist = dist * 60 * 1.1515 * 1.609344;

  return dist;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      Local.innerHTML = "Usuário rejeitou a solicitação de Geolocalização.";
      break;
    case error.POSITION_UNAVAILABLE:
      Local.innerHTML = "Localização indisponível.";
      break;
    case error.TIMEOUT:
      Local.innerHTML = "O tempo da requisição expirou.";
      break;
    case error.UNKNOWN_ERROR:
      Local.innerHTML = "Algum erro desconhecido aconteceu.";
      break;
  }
}


