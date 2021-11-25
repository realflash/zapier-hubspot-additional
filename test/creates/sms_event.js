require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - log SMS received', () => {
  zapier.tools.env.inject();

  it('should get an array with more than 1 element', async () => {
    const bundle = {
      authData: {
        hapi_key: process.env.HUBSPOT_API_KEY,
      },

      inputData: {
			tickets: [{"ticketID":"161391783"},{"ticketID":"161521798"}],
			from_phone: '07815142001',
			to_phone: '07451280992',
			event_type: 'received',
			message: 'Test message',
			time: Date.now(),
		},
    };

    const response = await appTester(
      App.creates['sms_event'].operation.perform,
      bundle
    );
    //~ console.log(response[0]);
    response.modified_count.should.equal(2);
  });
  
  
});
