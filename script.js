// Inicializa o mapa centrado em Salto
var map = L.map('map').setView([-23.176, -47.281], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Carrega o GeoJSON
fetch('saltoGJON.geojson')
    .then(res => res.json())
    .then(data => {
    // Desenha o polígono da cidade
    var cityLayer = L.geoJSON(data, {
        style: {color: 'blue', weight: 2, fillOpacity: 0.1}
    }).addTo(map);

    // Delimita o mapa aos limites da cidade
    map.setMaxBounds(cityLayer.getBounds());
    map.options.maxBoundsViscosity = 1.0; // impede o usuário de sair do limite
    });
var marker = L.marker([-23.18521768437905, -47.28429933910638]).addTo(map); 
marker.bindPopup("<b>Casa do felpe</b><br>").openPopup();
var marker = L.marker([-23.186269482908823, -47.302672590227516]).addTo(map);  //-23.186269482908823, -47.302672590227516
marker.bindPopup("<b>IFSP</b><br>").openPopup();
var marker = L.marker([-23.197503889042096, -47.291592603718286]).addTo(map);
marker.bindPopup('<p> Ginasio </p> <a href="teste.html"> informações </a>').openPopup();
