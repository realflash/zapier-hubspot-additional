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
      label: 'Private app access token',
      type: 'password',
      helpText: 'Go to HubSpot > Settings > Integrations > Private Apps',
    },
  ],
  customConfig: {},
};
