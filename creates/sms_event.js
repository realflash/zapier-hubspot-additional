const perform = async (z, bundle) => {
  var engagement = {
	engagement: {
        active: true,
        ownerId: 851,
        type: "CALL",
        timestamp: bundle.inputData.time
    },
    associations: {
        contactIds: [],
        companyIds: [],
        dealIds: [],
        ownerIds: [],
		ticketIds:[bundle.inputData.tickets[0].ticketID]
    },
    metadata: {
        toNumber: bundle.inputData.to_phone,
        fromNumber: bundle.inputData.from_phone,
        status: "COMPLETED",
        durationMilliseconds: 1000,
    }
  }
  
  const options = {
    url: 'https://api.hubapi.com/engagements/v1/engagements',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
	params: { hapikey: bundle.authData.hapi_key },					// v1 auth for engagements API is different to v3 auth for CRM API. Yay.
    body: engagement
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const data = response.json;

	return [{ modified_count: 0 }];
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'tickets',
        label: 'Tickets to update',
        children: [
			{
				key: 'ticketID',
				type: 'integer',
				label: 'Ticket ID',
				required: true,
			}
        ],
        required: true,
        list: false,
        altersDynamicFields: false,

      },
      {
        key: 'from_phone',
        label: 'Phone number that message was sent from',
        type: 'string',
        required: true,
        altersDynamicFields: false,
      },
      {
        key: 'to_phone',
        label: 'Phone number that message was sent to',
        type: 'string',
        required: true,
        altersDynamicFields: false,
      },
      {
        key: 'event_type',
        label: 'Event type',
        choices: { delivery_success:'SMS delivery succeeded', delivery_failure:'SMS delivery failed', received:'SMS received' },
        required: true,
        altersDynamicFields: false,
      },
      {
        key: 'time',
        label: 'Date and time the event occurred',
        type: 'datetime',
        required: true,
        altersDynamicFields: false,
      },
    ],
    sample: {
      modified_count: 2,
    },
    outputFields: [
      { key: 'modified_count', label: 'Count of tickets modified', type: 'integer' },
    ],
  },
  key: 'sms_event',
  noun: 'Event',
  display: {
    label: 'Add SMS Event to Tickets',
    description:
      'Add an event to the timeline of one or more tickets as a CALL engagement, describing a send or receive event of an SMS. For use with Sakari, which only logs events to contacts.',
    hidden: false,
    important: true,
  },
};
