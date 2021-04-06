const axios = require('axios')
let secrets

module.exports = function(input, callback, error) {
  secrets = input.secrets
  let webhookRequest = input.request
  webhookRequest.body.value = true
  getUserId(webhookRequest.body.email).then(userId => {
    webhookRequest.url += `${userId}/licensed?key=${secrets.trelloApiKey}&token=${secrets.trelloApiToken}`
    callback(webhookRequest)
  })
}

function getUserId(email) {
  return new Promise(resolve => {
    let getUserIdRequest = {
      method: "GET",
      url: `https://trello.com/scim/v2/users?filter=emails.value eq "${email}"`,
      headers: {
        Authorization: `Bearer ${secrets.trelloToken}`
      }
    }
    
    axios(getUserIdRequest).then(response => {
      let userId = response.data.Resources[0].id
      resolve(userId)
    })
  })
}
