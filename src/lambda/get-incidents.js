const Airtable = require('airtable');

require('dotenv').config()

const { AIRTABLE_API_KEY } = process.env;

const base =
  new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appXG4ZW7CCWHM535');

const getIncidentsSuccess = (error, records, callback) => {
  if (error) {
    callback(error);
    return;
  }

  const incidents = [];

  records.forEach(record => {
    incidents.push({
      name: record.get('Name'),
      lastOccurrence: record.get('Last Occurrence')
    });
  });

  return incidents;
};

exports.handler = async (event, context, callback) => {
  base('Incident Types')
    .select({
      fields: ['Name', 'Last Occurrence'],
    })
    .all((error, records) => {
      const incidents = getIncidentsSuccess(error, records, callback);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(incidents)
      });
    });
};
