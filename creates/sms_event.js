const perform = async (z, bundle) => {
	var engagement = {
		engagement: {
			active: true,
			ownerId: 851,
			type: "CALL",
		},
		associations: {
		},
		metadata: {
			toNumber: bundle.inputData.to_phone,
			fromNumber: bundle.inputData.from_phone,
			durationMilliseconds: 1000,
			body: bundle.inputData.message
		}
	}
	console.log(bundle.inputData.tickets[0]);
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

	var ticket_ids = [];
	z.console.log('Tickets input value: ' + bundle.inputData.tickets);											
	for (const ticket of bundle.inputData.tickets)
	{	// Zapier forces us to use an AoH as input. Convert to A
		ticket_ids.push(ticket.id);
	}
	z.console.log('Tickets IDs array: '+ ticket_ids);											
	engagement.associations.ticketIds = ticket_ids;
	// Adjust the body content according to what happened.
	switch(bundle.inputData.event_type) {
		case "delivery_success":
			engagement.metadata.status = "COMPLETED";
			engagement.metadata.disposition = "f240bbac-87c9-4f6e-bf70-924b57d47db7";
			break;
		case "received":
			engagement.metadata.status = "COMPLETED";
			engagement.metadata.disposition = "f240bbac-87c9-4f6e-bf70-924b57d47db7";
			break;
		case "delivery_failure":
			engagement.metadata.status = "FAILED";
			break;
	}
	// Get the time the event ocurred
	var dateTime = new Date(bundle.inputData.time);
	engagement.engagement.timestamp = dateTime.getTime();
	z.console.log('Engagement: ' + JSON.stringify(engagement, null, 4));											

	// Make the call
	const response = await z.request(options);
	response.throwForStatus();
	const data = response.json;
	z.console.log('Response: ' + JSON.stringify(data, null, 4));											
	return { modified_count: bundle.inputData.tickets.length - data.associationCreateFailures.length };
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
				key: 'id',
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
        key: 'message',
        label: 'The content of the message that was sent or received',
        type: 'string',
        required: true,
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
