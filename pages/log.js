
const fetch = require('node-fetch');

const handlePostRequest = async (req, res) => {
  try {
    const { message } = req.body;
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    const webhookUrl = 'https://webhook.newstargeted.com/api/webhooks/1159170951217422459/BDbsM_GEvj7ZOEsCeCcrSjQL9LsE11QUGIXC0lXOk9qOsEr2sGAu224uxz3kWe7lAtZh';
    const webhookData = {
      text: message,
      ip: ip
    };
    const webhookHeaders = {
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: webhookHeaders,
      body: JSON.stringify(webhookData)
    });
   
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      throw new Error('Webhook gönderim isteği başarısız');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = handlePostRequest;
