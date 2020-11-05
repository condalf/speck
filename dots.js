const speck = {
    update: async () => {
        const table = document.getElementById("tab:address");
        const provider = new GeoSearch.OpenStreetMapProvider();


        for (let i = 1; i < table.rows.length; i++) {
            const address = table.rows[i].cells[1].innerText;
            const results = await provider.search({ query: "KT15 3DR"});
            const result = results[0];
            var marker = L.marker([result.y, result.x]).addTo(map);
        }
    }
}