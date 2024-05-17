mapboxgl.accessToken = 'pk.eyJ1IjoicHRyY251bGwiLCJhIjoiY2xlNTZueWp3MGE0NjN2cDIxYzYxNzBsOSJ9.fzdAYC9AgQggkOOgYj5e_w'
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ptrcnull/cle574a3m001u01oc5oacboib',
    center: [21.0053,52.2318],
    zoom: 10,
})

/*
Overpass-Turbo query:
    node
    [station=subway]
    (52.04151074927383,20.694808959960938,52.43843218574213,21.419219970703125);
    out;
*/
// https://um.warszawa.pl/-/stolica-pieciu-linii-metra
const lines = [
    {
        '#meta': {
            name: 'M1',
            color: '#005BBB'
        },
        // OSM
        'Kabaty': [ 21.0650711, 52.1320765 ],
        'Natolin': [ 21.0564351, 52.1411007 ],
        'Imielin': [ 21.0461062, 52.1493 ],
        'Stokłosy': [ 21.0347233, 52.1560759 ],
        'Ursynów': [ 21.0276283, 52.1620456 ],
        'Służew': [ 21.0262866, 52.1727624 ],
        'Wilanowska': [ 21.0231369, 52.1818 ],
        'Wierzbno': [ 21.016599, 52.1899435 ],
        'Racławicka': [ 21.0121943, 52.1989416 ],
        'Pole Mokotowskie': [ 21.0077851, 52.208529 ],
        'Politechnika': [ 21.0153582, 52.2184572 ],
        // https://metro.waw.pl/metro-warszawskie/linia-m1/stacje-plac-konstytucji-i-muranow/
        'Plac Konstytucji': [ 21.01498, 52.22442 ],
        'Centrum': [ 21.0100632, 52.2311577 ],
        'Świętokrzyska': [ 21.0078988, 52.2350954 ],
        'Ratusz Arsenał': [ 21.0011584, 52.2449972 ],
        'Muranów': [ 20.99854, 52.25039 ],
        'Dworzec Gdański': [ 20.9943315, 52.2578685 ],
        'Plac Wilsona': [ 20.9843885, 52.2692519 ],
        'Marymont': [ 20.9717196, 52.2716615 ],
        'Słodowiec': [ 20.9602351, 52.2768253 ],
        'Stare Bielany': [ 20.9493596, 52.2818172 ],
        'Wawrzyszew': [ 20.9395965, 52.2863179 ],
        'Młociny': [ 20.9298695, 52.2907599 ],
    },
    {
        '#meta': {
            name: 'M2',
            color: '#C60C30'
        },
        // IDZD
        'Ursus Niedźwiadek': [ 20.86885, 52.19186 ],
        'Szamoty': [ 20.87377, 52.20223 ],
        'Ursus Płn.': [ 20.88985, 52.20566 ],
        // Wikipedia
        'Karolin': [ 20.88634, 52.21649 ],
        'Chrzanów': [ 20.88959, 52.22721 ],
        'Lazurowa': [ 20.89587, 52.23838 ],
        // OSM
        'Bemowo': [ 20.9155062, 52.239197 ],
        'Ulrychów': [ 20.9298276, 52.2403208 ],
        'Księcia Janusza': [ 20.9443705, 52.2391816 ],
        'Młynów': [ 20.9601813, 52.2376748 ],
        'Płocka': [ 20.9663573, 52.2325009 ],
        'Rondo Daszyńskiego': [ 20.982848, 52.230052 ],
        'Rondo ONZ': [ 20.9981863, 52.2331283 ],
        'Świętokrzyska': [ 21.0078988, 52.2350954 ],
        'Nowy Świat-Uniwersytet': [ 21.016788, 52.236833 ],
        'Centrum Nauki Kopernik': [ 21.0317878, 52.2399148 ],
        'Stadion Narodowy': [ 21.0428754, 52.2469807 ],
        'Dworzec Wileński': [ 21.0355034, 52.2540622 ],
        'Szwedzka': [ 21.0453302, 52.2634539 ],
        'Targówek Mieszkaniowy': [ 21.0514129, 52.2695853 ],
        'Trocka': [ 21.0554496, 52.2753464 ],
        'Zacisze': [ 21.0621986, 52.2837212 ],
        'Kondratowicza': [ 21.0486696, 52.292074 ],
        'Bródno': [ 21.0289407, 52.2935846 ],
        // IDZD
        'Toruńska': [ 21.01322, 52.29380 ],
        'Żerań FSO': [ 21.00280, 52.29049 ],
        'Potok': [ 20.98718, 52.27891 ],
        // https://www.transport-publiczny.pl/wiadomosci/rusza-przetarg-na-prace-przedprojektowe-dla-iv-linii-metra-wraz-z-stp-82527.html
        'Marymont (M2+M4)': [ 20.97470, 52.27001, -58 ],
    },
    {
        '#meta': {
            name: 'M3',
            color: '#00B050'
        },
        // https://metro.waw.pl/metro-warszawskie/linia-m3/przebieg-i-lokalizacja-stacji/
        'Stadion Narodowy': [ 21.0428754, 52.2469807 ],
        'Dworzec Wschodni': [ 21.05031, 52.25294 ],
        'Mińska': [ 21.07420, 52.25211 ],
        'Wiatraczna': [ 21.08469, 52.24502 ],
        'Ostrobramska': [ 21.09755, 52.23479 ],
        'Nowaka-Jeziorańskiego': [ 21.09563, 52.23113 ],
        'Gocław': [ 21.09219, 52.22438 ],
        // IDZD + https://www.siskom.waw.pl/kp-tramwaj_WPT.htm
        'Gościniec': [ 21.07301, 52.21255 ],
        'Siekierki': [ 21.06654, 52.20920 ], // gdzie ten p+r ma być tutaj??
        'Czerniaków': [ 21.05850, 52.20812 ],
        'Sielce': [ 21.04850, 52.20714 ],
        'Stary Mokotów': [ 21.02393, 52.19971 ],
        'Racławicka': [ 21.0121943, 52.1989416 ], // M1
        'Wyględów': [ 20.99281, 52.19681 ],
        'Żwirki i Wigury (M3+M4)': [ 20.98126, 52.19365, -90 ],
    },
    {
        '#meta': {
            name: 'M4',
            color: '#FFC000'
        },
        // https://www.transport-publiczny.pl/wiadomosci/rusza-przetarg-na-prace-przedprojektowe-dla-iv-linii-metra-wraz-z-stp-82527.html
        'Myśliborska': [ 20.96319, 52.31763, 20 ],
        'Obrazkowa': [ 20.97582, 52.31494, -50 ],
        'Płochocińska': [ 20.98301, 52.30784, -40 ],
        'Ruda': [ 20.97636, 52.28376, -78 ],
        'Marymont (M2+M4)': [ 20.97470, 52.27001, -58 ],
        'Rydygiera': [ 20.98133, 52.26028, -75 ],
        'Rondo Radosława': [ 20.98185, 52.25418, -100 ],
        'Cmentarz Żydowski': [ 20.97794, 52.24353, -70 ],
        'Okopowa': [ 20.98025, 52.23757, -70 ],
        'Rondo Daszyńskiego (M4)': [ 20.98383, 52.23108, -50 ],
        'Plac Zawiszy': [ 20.98789, 52.22635, -54 ],
        'Plac Narutowicza (M4)': [ 20.98304, 52.21858, -130 ],
        'Bitwy Warszawskiej 1920': [ 20.97653, 52.21111 ],
        'Wiślicka': [ 20.97668, 52.20414, -25 ],
        'Żwirki i Wigury (M3+M4)': [ 20.98126, 52.19365, -90 ],
        'Służewiec': [ 20.98922, 52.18140, -12 ],
        'Rondo Unii Europejskiej': [ 21.00179, 52.17866, -10 ],
        'Smoluchowskiego': [ 21.01251, 52.17959, 15 ],
        'Wilanowska (M4)': [ 21.02282, 52.18053, 0 ],
        'Dolina Służewiecka': [ 21.04421, 52.17518, -14 ], // missing picture
        'Patkowskiego': [ 21.05437, 52.17284, -13 ],
        'Sobieskiego': [ 21.06804, 52.16979, -13 ],
        'Wilanów': [ 21.08450, 52.16631, -90 ],
    },
    {
        '#meta': {
            name: 'M5',
            color: '#7030A0'
        },
        // IDZD
        'Szamoty': [ 20.87377, 52.20223 ],
        'Ursus': [ 20.88363, 52.19590 ],
        'Plac Tysiącelecia': [ 20.89205, 52.19320 ],
        'Skorosze': [ 20.90814, 52.19220 ],
        'Wiktoryn': [ 20.92845, 52.19594 ],
        'Aleje Jerozolimskie': [ 20.94206, 52.20517 ],
        'Śmigłowca': [ 20.94920, 52.20995 ],
        'Dworzec Zachodni': [ 20.96655, 52.21813 ],
        'Plac Narutowicza': [ 20.98400, 52.21894 ],
        'Filtry': [ 20.99522, 52.21906 ],
        'Plac Konstytucji': [ 21.01498, 52.22442 ], // M1
        'Piękna': [ 21.02412, 52.22396 ],
        'Solec': [ 21.04073, 52.22585 ],
        'Saska Kępa': [ 21.06307, 52.22866 ],
        'Kanał Gocławski': [ 21.07525, 52.23302 ], // tramwaj??
        'Przyczółek Grochowski': [ 21.08146, 52.23570 ],
        'Ostrobramska': [ 21.09755, 52.23479 ],
        'Witolin': [ 21.11323, 52.23303 ],
        'Marsa': [ 21.12799, 52.23474 ],
        'Gocławek': [ 21.13204, 52.23898 ],
    }
]
const myCuteMarker = document.createElement('div')
myCuteMarker.innerHTML = `
    <svg height="24px" width="24px">
        <circle
            style="fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:4px;stroke-dasharray:none;stroke-opacity:1"
            cx="12.0"
            cy="12.0"
            r="6">
        </circle>
    </svg>
`

function offsetPoint(point) {
    const xy = point.slice(0, 2)
    const [ x, y ] = xy
    const angle = point[2] * (Math.PI / 180)
    const scale = 0.001
    const offsetX = Math.cos(angle) * scale
    const offsetY = Math.sin(angle) * scale
    return [[ x - offsetX, y - offsetY ], xy, [ x + offsetX, y + offsetY ]]
}

function loadLines() {
    let markers = {}
    for (let line of lines) {
        const meta = line['#meta']
        console.log('adding line', meta)
        markers = { ...line, ...markers }
        const points = Object.values(line)
            .filter(Array.isArray)
            .flatMap(point => point[2] ? offsetPoint(point) : [point])
        map.addSource(meta.name, {
            type: 'geojson',
            data: {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': catmullRomFitting(points, 1)
                }
            }
        })
        map.addLayer({
            id: meta.name,
            'type': 'line',
            'source': meta.name,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': meta.color,
                'line-width': 8
            }
        })
    }
    for (let [name, coords] of Object.entries(markers)) {
        if (name === '#meta') continue
        console.log('adding marker', name, coords)
        new mapboxgl.Marker({
            element: myCuteMarker.cloneNode(true)
        })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setHTML(`<p>${name}</p>`))
            .addTo(map)
    }
}
map.on('load', loadLines)
