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

    map.setMaxBounds(cityLayer.getBounds());
    map.options.maxBoundsViscosity = 1.0; // impede o usuario de sair do limite
    });
fetch('quadras.geojson')
.then(res => res.json())
.then(data => {

    L.geoJSON(data, {
        style: function(feature) {
            return {
                color: 'green',
                weight: 2,
                fillOpacity: 0.5
            };
        },

        onEachFeature: function(feature, layer) {
            let esporte = feature.properties.sport || "Esporte";
            layer.bindPopup("<b>Quadra</b><br>" + esporte);
        }

    }).addTo(map);
});
fetch('quadras.geojson')
.then(res => res.json())
.then(data => {

    L.geoJSON(data, {

        style: {
            color: 'green',
            fillOpacity: 0.3
        },

        onEachFeature: function(feature, layer) {

            let esporte = feature.properties.sport || "Esporte";

            layer.bindPopup("<b>Quadra</b><br>" + esporte);

            // cria marcador no centro
            let center = layer.getBounds().getCenter();

            L.marker(center)
                .addTo(map)
                .bindPopup("Centro da quadra: " + esporte);
        }

    }).addTo(map);
});


