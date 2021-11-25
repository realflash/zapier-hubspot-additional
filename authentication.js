module.exports = {
  type: 'custom',
  test: {
    url: 'https://api.hubapi.com/crm/v3/objects/tickets?limit=10&archived=false',
    method: 'GET',
    params: {},
    headers: { Authorization: 'Bearer {{bundle.authData.access_token}}' },
    body: {},
    removeMissingValuesFrom: {},
  },
  fields: [
    {
      computed: false,
      key: 'access_token',
      required: true,
      label: 'Private app access token (needed for access to CRM API)',
      type: 'password',
      helpText: 'Go to HubSpot > Settings > Integrations > Private Apps - https://app.hubspot.com/private-apps/<yourhubID>. Scopes required: tickets, crm.ojects.contacts.read',
    },
    {
      computed: false,
      key: 'hapi_key',
      required: true,
      label: 'Full access API key (needed for access to Engagements API)',
      type: 'password',
      helpText: 'Go to HubSpot > Settings > Integrations > API Key - https://app.hubspot.com/api-key/<yourhubID>/call-log',
    },
  ],
  customConfig: {},
};
