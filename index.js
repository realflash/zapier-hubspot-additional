const authentication = require('./authentication');
const findTicketsSearch = require('./searches/find_tickets.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  searches: { [findTicketsSearch.key]: findTicketsSearch },
};
