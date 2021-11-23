require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

describe('Search - find_tickets no state filter', () => {
  zapier.tools.env.inject();

  it('should get an array with more than 1 element', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]'
		},
    };

    const response = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    //~ console.log(response[0]);
    response[0].results.should.be.an.Array();
    response[0].results.length.should.be.aboveOrEqual(1);
    response[0].count.should.equal(response[0].results.length);
    response[0].results[0].should.have.property('id');
  });
  
  
});

describe('Search - find_tickets with state filter', () => {
  zapier.tools.env.inject();

  it('should get an array with 1 element containg ticket 161521798', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]',
			state_inclusion: {
				4: 1
			}
		},
    };

    const response = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    response[0].results.should.be.an.Array();
    response[0].results.length.should.equal(1);
    response[0].count.should.equal(response[0].results.length);
    response[0].results[0].id.should.equal('161521798');
    response[0].results[0].properties.hs_pipeline_stage.should.equal('4');
  });
});

describe('Search - find_tickets with complex state filter', () => {
  zapier.tools.env.inject();

  it('should get an array with 2 elements', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]',
			state_inclusion: {
				6098389: 1,
				4: 1
			}
		},
    };

    const response = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    //~ console.log(response[0]);
    response[0].results.should.be.an.Array();
    response[0].results.length.should.be.aboveOrEqual(2);
    response[0].count.should.equal(response[0].results.length);
    console.log("Ticket 0: " + response[0].results[0].id + ", state " + response[0].results[0].properties.hs_pipeline_stage);
    console.log("Ticket 1: " + response[0].results[1].id + ", state " + response[0].results[0].properties.hs_pipeline_stage);
    response[0].results[0].id.should.equal('161391783');
    response[0].results[1].id.should.equal('161521798');
    response[0].results[1].properties.hs_pipeline_stage.should.equal('4');
  });
});

describe('Search - find_tickets with non-matching state filter', () => {
  zapier.tools.env.inject();

  it('should be an empty array', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },

      inputData: {
			filter: '[{"filters":[{"value":"TESTVALUE","propertyName":"vehicle","operator":"EQ"}]}]',
			state_inclusion: {
				999999: 1
			}
		},
    };

    const response = await appTester(
      App.searches['find_tickets'].operation.perform,
      bundle
    );
    response[0].results.should.be.an.Array();
    response[0].results.length.should.equal(0);
    response[0].count.should.equal(response[0].results.length);
    console.log(response[0]);
  });
});
