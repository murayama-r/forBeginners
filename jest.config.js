const fetchPolifill = require('whatwg-fetch')

global.fetch = fetchPolifill.fetch
global.Request = fetchPolifill.Request
global.Headers = fetchPolifill.Headers
global.Response = fetchPolifill.Response

module.exports = {
  globals: {
    fetcht: fetchPolifill.fetch,
  },
}
