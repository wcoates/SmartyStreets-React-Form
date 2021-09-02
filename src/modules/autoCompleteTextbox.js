import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getFuzzyAddressMatch, getPreciseAddressMatch} from './smartyStreetsClient.js';

export default function AutocompleteTextbox() {
  const [options, setOptions] = React.useState([]);
  const emptyState = [];

  const onChangeHandle = async value => {
    if (value) {
      const addressMatchResults = getFuzzyAddressMatch(value);

      if (addressMatchResults) {
        const optionLabelNames = addressMatchResults.map(options => getOptionLabelName(options));
        setOptions(optionLabelNames.map(options => options));
      }
    }
  }

  return (< Autocomplete id = "freesolo" style = {
    {
      width: 300
    }
  }
  getOptionLabel = {
    option => option
  }
  options = {
    options
  }

  renderInput = {
    params => (< TextField {
      ...params
    }
    label = "Street Address" variant = "outlined" onChange = {
      ev => {
        // dont fire API if the user delete or not entered anything
        if (ev.target.value) {
          onChangeHandle(ev.target.value);
        } else {
          setOptions(emptyState);
        }
      }
    }
    InputProps = {
      {
        ...params.InputProps
      }
    } />)
  } />);
}

function getOptionLabelName(suggestion) {
  if (!suggestion.secondary && suggestion.entries === 0) {
    return suggestion.streetLine + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode;
  }

  return suggestion.streetLine + " " + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode + " (" + suggestion.entries + " additional results)";
}
