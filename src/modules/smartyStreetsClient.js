export {
  getFuzzyAddressMatch,
  getPreciseAddressMatch
}

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;
const CLIENT_MAX_RESULTS = 5;
const CLIENT_PREFER_STATES = ["MO"];

// https://github.com/smartystreets/smartystreets-javascript-sdk/blob/master/examples/us_autocomplete_pro.js
const key = "21102174564513388";
const credentials = new SmartyStreetsCore.SharedCredentials(key);
const clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials).withLicenses(["us-autocomplete-pro-cloud"]);
const client = clientBuilder.buildUsAutocompleteProClient();
let addressMatchResults = null;

function defaultLookup(addressInput) {
  let lookup = new Lookup(addressInput);
  lookup.maxResults = CLIENT_MAX_RESULTS;
  lookup.preferStates = CLIENT_PREFER_STATES;

  return lookup;
}

function getAddressMatchResults(lookup) {
  client.send(lookup).then(function(results) {
    addressMatchResults = results.result;
    logSuggestions(results, "Simple Lookup")
  }).catch(console.log);

  return addressMatchResults
    ? addressMatchResults
    : [];
}

function logSuggestions(response, message) {
  console.log(message);
  console.log(response.result);
  console.log("*********************");
}

function getFuzzyAddressMatch(addressInput) {
  return getAddressMatchResults(defaultLookup(addressInput));
}

function getPreciseAddressMatch(addressInput) {
  return getAddressMatchResults(defaultLookup(addressInput).selected);
}
