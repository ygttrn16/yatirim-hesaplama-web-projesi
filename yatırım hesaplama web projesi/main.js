  // CoinGecko API'den en iyi 50 kripto paranın verisini al
  const coinGeckoAPI = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

  // Kripto para verilerini al
  fetch(coinGeckoAPI)
      .then(response => response.json())
      .then(data => {
          let cryptoData = 'Kripto Marketcap:';
          data.forEach(coin => {
              cryptoData += `${coin.name}: $${coin.current_price} | `;
          });

          // Kripto paraların verisini ekle
          document.getElementById("crypto-data").innerHTML = cryptoData.slice(0, -3); // Sonundaki fazlalıkları temizle
      })
      .catch(error => console.error('Kripto veri hatası:', error));



      const apiKey = 'pJsAAARXMN7ymt2TjZqLoXozWXsMFdyr';
      const topSymbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "META", "NVDA", "BRK.B", "V", "UNH", "MA", "DIS", "HD", "PYPL", "NFLX", "INTC", "CSCO", "BA", "KO", "PFE", "JNJ", "MRK", "IBM", "WMT", "VZ", "NKE", "AMGN", "TXN", "MCD", "GS", "CAT", "CVX", "XOM", "ABT", "PEP", "ADBE", "AMD", "BABA", "INTU", "CRM", "LMT", "RTX", "ORCL", "T", "GE", "AXP", "SPGI", "SLB", "LLY", "BKNG", "C", "MS", "GS"]; // 50 sembol

      // Hisse fiyatlarını almak için API'den veri çekme
      function fetchStockData(symbols) {
          let stockData = '';

          // Semboller için her bir istek yapıyoruz
          const promises = symbols.map(symbol => {
              const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${apiKey}`;

              return fetch(url)
                  .then(response => response.json())
                  .then(data => {
                      if (data.results && data.results.length > 0) {
                          const lastPrice = data.results[0].c; // Son kapanış fiyatı
                          return `${symbol}: $${lastPrice}`;
                      } else {
                          console.warn(`${symbol} için veri bulunamadı:`, data); // Boş yanıt durumunda uyarı
                          return `${symbol}: Veri bulunamadı`;
                      }
                  })
                  .catch(error => {
                      console.error(`${symbol} için hisse verisi hatası:`, error); // Hata mesajı
                      return `${symbol}: Hata oluştu`;
                  });
          });

          // Tüm veriler geldikten sonra şeridi güncelle
          Promise.all(promises)
              .then(results => {
                  stockData = results.join(' | '); // Tüm verileri birleştir
                  document.getElementById("stocks-data").innerHTML = stockData; // Şeridi güncelle
              })
              .catch(error => console.error('Veri alırken hata oluştu:', error));
      }

      // Sayfa yüklendiğinde hisse verilerini al
      window.onload = function() {
          fetchStockData(topSymbols); // 50 sembolün verilerini al
      };