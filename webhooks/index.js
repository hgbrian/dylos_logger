//
// adapted from a function from particle.io
// gcloud beta functions deploy log_dylos --trigger-topic dylosparticlecounter --stage-bucket fn-dylosparticlecounter
//
'use strict';

// https://www.npmjs.com/package/@google-cloud/datastore
const datastore = require('@google-cloud/datastore')({
  projectId: 'example_project_id',
});

function log_reading(subdata) {
  const commit_key = datastore.key('log_dylos');
  const entity = {
    key: commit_key,
    data: subdata
  };

  return datastore.save(entity)
    .then(() => {
      console.log(`particle event ${commit_key.id} created successfully.`);
      return commit_key;
    });
}

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event The Cloud Functions event.
 * @param {!Function} The callback function.
 */
exports.log_dylos = function log_dylos(event, callback) {
  const pubsubMessage = event.data;
  const _datastr = Buffer.from(pubsubMessage.data, 'base64').toString();
  var subdata = {"pm25":parseInt(_datastr.split(',')[0]), 
                 "pm10":parseInt(_datastr.split(',')[1]), 
                 "time_added":Date.now()};
  log_reading(subdata);

  callback();
};

