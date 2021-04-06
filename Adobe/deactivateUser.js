const axios = require('axios')
let secrets 

module.exports = function(input, callback, error) {
  secrets = input.secrets
  let webhookRequest = input.request
  let data = [{
    "user": webhookRequest.body.email,
    "requestID": "deactivate_user",
    "do": [{
      "remove": "all"
    },
    {
      "removeFromOrg": {
        "deleteAccount": false
      }
    }]
  }]
  
  generateAccessToken().then(token => {
    webhookRequest.headers.Authorization = `Bearer ${token}`
    webhookRequest.body = data
    callback(webhookRequest)
  })
}

function generateAccessToken() {
  return new Promise(resolve => {
    let generateTokenRequest = {
      method: 'POST',
      url: `https://ims-na1.adobelogin.com/ims/exchange/jwt?client_id=${secrets.client_id}&client_secret=${secrets.client_secret}&jwt_token=${secrets.jwt_token}`
    }
    
    axios(generateTokenRequest).then(response => {
      resolve(response.data.access_token)
    })
  })
}
