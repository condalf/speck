/**
 * Main class.
 */
class Program {

    /**
     * Create the program.
     */
    constructor() {
        this.map = this._initMap();
        this.mapProvider = new GeoSearch.OpenStreetMapProvider();
        this.markers = [];
        this.table = document.getElementById("addresses");
    }


    /**
     * Update the map.
     */
    async updateMarkers() {
        this._clearMarkers();

        // Process the table entries and add markers to the map.
        for (const row of this.table.rows) {
            // Skip first (heading) row.
            if (row.rowIndex == 0) continue;

            // Search for the address.
            const inputField = row.cells[1].children[0];
            const address = inputField.value;

            // Skip empty fields.
            if (address === "") continue;

            // Search for the address and take the first result.
            const results = await this.mapProvider.search({ query: address });

            // Highlight in red if no results found.
            if (results.length == 0) {
                inputField.style.background = "red";
                continue;
            }

            const result = results[0];

            // Create the marker.
            let icon = L.icon({
                iconUrl: `./images/marker${row.rowIndex}.png`,
                iconAnchor: [25, 25],
                popupAnchor: [0, -25]
            });

            const marker = L.marker([result.y, result.x], { icon: icon })
                .addTo(this.map) 
                .bindPopup(address, { autoClose: false, closeButton: false, closeOnClick: false });
            this.markers.push(marker);
        }
    }


    clear() {
        // Remove table entries.
        let table = document.getElementById("addresses");
        for (const row of this.table.rows) {
            // Skip first (heading) row.
            if (row.rowIndex == 0) continue;

            const inputField = row.cells[1].children[0];
            inputField.value = "";
        }

        // Remove the markers.
        this._clearMarkers();
    }


    /**
     * Initialise the map.
     */
    _initMap() {
        // Create the map and add tiling to it.
        let map = L.map("map").setView([51.319129, -0.559470], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: "pk.eyJ1IjoiY2p3YXJkIiwiYSI6ImNraDU1OWFnZjAybTEycXBlcHRnY3pyZTMifQ.v6TcrIOVzT9IbQyMxBudcQ"
        }).addTo(map);

        return map;
    }
    
    
    _clearMarkers() {
        // Remove all previous markers.
        for (const marker of this.markers) 
            marker.remove();
        this.markers = [];
    }
}


var program = new Program();
