const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.hubapi.com/crm/v3/objects/tickets/search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${bundle.authData.access_token}`,
    },
    body:
      '{"filterGroups":' +
      bundle.inputData.filter +
      ',"sorts":[{"propertyName":"createdate","direction":"DESCENDING"}],"limit": 100}',
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const data = response.json;

	var filtered_results = [];
    // If we have a list of valid states, only include results that match them
	if(typeof(bundle.inputData.state_inclusion) != "undefined")
	{
			for (const result of data.results)
			{
				if(bundle.inputData.state_inclusion[result.properties.hs_pipeline_stage] == 1)
				{
					filtered_results.push(result);
				}
			}
	}
	else
	{	// pass all results through unfiltered
		filtered_results = data.results;
	}

	return filtered_results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'filter',
        label: 'Filter',
        type: 'text',
        helpText:
          'See the [HubSpot CRM API](https://developers.hubspot.com/docs/api/crm/tickets), "search" endpoint. Make sure your filter is enclosed in [ ]',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'state_inclusion',
        label: 'Status inclusion',
        helpText:
          "For each possible value of hs_pipeline_stage, state whether a ticket should be included in the results. To include a ticket, set to 1. Otherwise set to 0. If the ticket's value for hs_pipeline_stage is not found in this dictionary, the default is to not include it (0). If your search does not filter on hs_pipeline, you will need to include values from all the possible pipelines to make sure all tickets get returned. A maximum of 100 tickets is returned by the HubSpot API BEFORE this filtering is carried out, so do not make your search too broad.\n\nIf this field is empty, all tickets are returned.",
        dict: true,
        required: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: '161521798',
      properties: {
        content: 'You can ignore this',
        createdate: '2020-07-16T13:50:11.754Z',
        hs_lastmodifieddate: '2021-11-16T15:27:27.612Z',
        hs_object_id: '161521798',
        hs_pipeline: '0',
        hs_pipeline_stage: '4',
        hs_ticket_category: null,
        hs_ticket_priority: 'LOW',
        subject: 'Test 2',
      },
      createdAt: '2020-07-16T13:50:11.754Z',
      updatedAt: '2021-11-16T15:27:27.612Z',
      archived: false,
    },
    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'properties__content', label: 'Description' },
      { key: 'properties__createdate', label: 'Create Date', type: 'datetime' },
      { key: 'properties__hs_pipeline', label: 'Pipeline' },
      { key: 'properties__hs_pipeline_stage', label: 'Status' },
      { key: 'subject', label: 'Title' },
    ],
  },
  key: 'find_tickets',
  noun: 'Ticket',
  display: {
    label: 'Find Tickets Advanced',
    description:
      'Finds tickets using a flexible JSON search filter. See the entry search under https://developers.hubspot.com/docs/api/crm/tickets for help buiding a filter. Maximum 100 results returned BEFORE any filtering, so do not make your search too broad. Tickets opened most recently will be first.',
    hidden: false,
    important: true,
  },
};
