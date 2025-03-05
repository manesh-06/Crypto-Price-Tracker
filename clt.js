async function fetchdata(cryptoName) {
    const symbol = cryptoName.toUpperCase() + "USDT";
    const api = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`;

    try {
        const response = await fetch(api);
        if (!response.ok) {
            document.getElementById("p1").textContent = "Invalid Cryptocurrency";
            return null;
        }
        return await response.json();
    } catch (error) {
        document.getElementById("p1").textContent = "Error fetching data";
    }
}

document.getElementById("button1").addEventListener("click", async () => {
    const cryptoName = document.getElementById("c").value.trim();
    const data = await fetchdata(cryptoName);

    if (data) {
        const USD = parseFloat(data.lastPrice).toFixed(4);
        document.getElementById("p1").textContent = `Price: $${USD}`;
    }
});

document.getElementById("button2").addEventListener("click", async () => {
    const cryptoName = document.getElementById("c").value.trim();
    const data = await fetchdata(cryptoName);

    if (data) {
        document.getElementById("p1").textContent = `24h Change: ${data.priceChangePercent}%`;
    }
});

document.getElementById("button3").addEventListener("click", async () => {
    const cryptoName = document.getElementById("c").value.trim();
    const data = await fetchdata(cryptoName);

    if (data) {
        const highPrice = parseFloat(data.highPrice).toFixed(4);
        document.getElementById("p1").textContent = `24h High: $${highPrice}`;
    }
});

document.getElementById("button4").addEventListener("click", async () => {
    const cryptoName = document.getElementById("c").value.trim();
    const data = await fetchdata(cryptoName);

    if (data) {
        const lowPrice = parseFloat(data.lowPrice).toFixed(4);
        document.getElementById("p1").textContent = `24h Low: $${lowPrice}`;
    }
});

document.getElementById("button5").addEventListener("click", async () => {
    const cryptoName = document.getElementById("c").value.trim();
    const data = await fetchdata(cryptoName);

    if (data) {
        document.getElementById("p1").textContent = `Trading Volume: ${parseFloat(data.volume).toFixed(2)} ${cryptoName.toUpperCase()}`;
    }
});

document.getElementById("button6").addEventListener("click", async () => {
    const apiUrl = "https://api.binance.com/api/v3/ticker/24hr";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Sort cryptocurrencies by highest percentage change in 24 hours
        const top5 = data
            .sort((a, b) => Math.abs(parseFloat(b.priceChangePercent)) - Math.abs(parseFloat(a.priceChangePercent)))
            .slice(0, 5);

        const listElement = document.getElementById("t5");
        listElement.innerHTML = "";

        top5.forEach(crypto => {
            const listItem = document.createElement("li");
            listItem.textContent = `${crypto.symbol.replace("USDT", "")}: Change ${parseFloat(crypto.priceChangePercent).toFixed(2)}%`;
            listElement.appendChild(listItem);
        });
    } catch (error) {
        document.getElementById("t5").innerHTML = "<li>Error fetching data!</li>";
    }
});
