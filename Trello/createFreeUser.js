const axios = require('axios')
let secrets

module.exports = function(input, callback, error) {
  secrets = input.secrets
  let webhookRequest = input.request
  let data = {
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "displayName": webhookRequest.body.displayName,
    "name": {
      "familyName": webhookRequest.body.lastName,
      "givenName": webhookRequest.body.firstName
    },
    "emails": [{
      "value": webhookRequest.body.email,
      "primary": true
    }],
    "roles": [{
      "value": "enterprise.owned",
      "display": "Owned by this enterprise"
    }]
  }
  
  webhookRequest.body = data
  callback(webhookRequest)
}
