require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Create - log SMS received using tickets retrieved by search', () => {
  zapier.tools.env.inject();

  it('should get a modified count of 2', async () => {
    const bundle = {
      authData: {
        hapi_key: process.env.HUBSPOT_API_KEY,
      },

      inputData: {
			tickets: [{"id":"161391783","properties":{"content":"You can ignore this","createdate":"2020-07-16T14:05:16.882Z","hs_lastmodifieddate":"2021-11-25T11:03:34.136Z","hs_object_id":"161391783","hs_pipeline":"6098385","hs_pipeline_stage":"6098389","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 3"},"createdAt":"2020-07-16T14:05:16.882Z","updatedAt":"2021-11-25T11:03:34.136Z","archived":false},{"id":"161521798","properties":{"content":"You can ignore this","createdate":"2020-07-16T13:50:11.754Z","hs_lastmodifieddate":"2021-11-25T11:03:34.690Z","hs_object_id":"161521798","hs_pipeline":"0","hs_pipeline_stage":"4","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 2"},"createdAt":"2020-07-16T13:50:11.754Z","updatedAt":"2021-11-25T11:03:34.690Z","archived":false}],
			from_phone: '07815142001',
			to_phone: '07451280992',
			event_type: 'received',
			message: 'Received: Test message',
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

describe('Create - log SMS sent successfully using tickets retrieved by search', () => {
  zapier.tools.env.inject();

  it('should get a modified count of 2', async () => {
    const bundle = {
      authData: {
        hapi_key: process.env.HUBSPOT_API_KEY,
      },

      inputData: {
			tickets: [{"id":"161391783","properties":{"content":"You can ignore this","createdate":"2020-07-16T14:05:16.882Z","hs_lastmodifieddate":"2021-11-25T11:03:34.136Z","hs_object_id":"161391783","hs_pipeline":"6098385","hs_pipeline_stage":"6098389","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 3"},"createdAt":"2020-07-16T14:05:16.882Z","updatedAt":"2021-11-25T11:03:34.136Z","archived":false},{"id":"161521798","properties":{"content":"You can ignore this","createdate":"2020-07-16T13:50:11.754Z","hs_lastmodifieddate":"2021-11-25T11:03:34.690Z","hs_object_id":"161521798","hs_pipeline":"0","hs_pipeline_stage":"4","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 2"},"createdAt":"2020-07-16T13:50:11.754Z","updatedAt":"2021-11-25T11:03:34.690Z","archived":false}],
			from_phone: '07815142001',
			to_phone: '07451280992',
			event_type: 'delivery_success',
			message: 'Sent: Test message',
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

describe('Create - log SMS not sent successfully using tickets retrieved by search', () => {
  zapier.tools.env.inject();

  it('should get a modified count of 2', async () => {
    const bundle = {
      authData: {
        hapi_key: process.env.HUBSPOT_API_KEY,
      },

      inputData: {
			tickets: [{"id":"161391783","properties":{"content":"You can ignore this","createdate":"2020-07-16T14:05:16.882Z","hs_lastmodifieddate":"2021-11-25T11:03:34.136Z","hs_object_id":"161391783","hs_pipeline":"6098385","hs_pipeline_stage":"6098389","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 3"},"createdAt":"2020-07-16T14:05:16.882Z","updatedAt":"2021-11-25T11:03:34.136Z","archived":false},{"id":"161521798","properties":{"content":"You can ignore this","createdate":"2020-07-16T13:50:11.754Z","hs_lastmodifieddate":"2021-11-25T11:03:34.690Z","hs_object_id":"161521798","hs_pipeline":"0","hs_pipeline_stage":"4","hs_ticket_category":null,"hs_ticket_priority":"LOW","subject":"Test 2"},"createdAt":"2020-07-16T13:50:11.754Z","updatedAt":"2021-11-25T11:03:34.690Z","archived":false}],
			from_phone: '07815142001',
			to_phone: '07451280992',
			event_type: 'delivery_failure',
			message: 'Failed: Test message',
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
