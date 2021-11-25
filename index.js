const authentication = require('./authentication');
const findTicketsSearch = require('./searches/find_tickets.js');
const smsEventCreate = require('./creates/sms_event.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  searches: { [findTicketsSearch.key]: findTicketsSearch },
  creates: { [smsEventCreate.key]: smsEventCreate },
};
