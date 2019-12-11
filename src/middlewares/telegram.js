const axios = require('axios');

module.exports = {
  
  sendMessage: data => {
    if (!process.env.BOT_URL) return;

    axios(process.env.BOT_URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: data,
        parse_mode: 'Markdown'
      })
    })
  }

}
