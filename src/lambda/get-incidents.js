const Airtable = require('airtable');

require('dotenv').config()

const { AIRTABLE_API_KEY } = process.env;

const base =
  new Airtable({ apiKey: AIRTABLE_API_KEY }).base('appXG4ZW7CCWHM535');

const getIncidentsSuccess = (records) => {
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
  try {
    return base('Incident Types')
      .select({
        fields: ['Name', 'Last Occurrence'],
      })
      .all()
      .then(records => {
        const incidents = getIncidentsSuccess(records);

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(incidents)
        });
      })
      .catch(error => {
        callback(error);
      });
  } catch (err) {
    callback(err);
  };
};
