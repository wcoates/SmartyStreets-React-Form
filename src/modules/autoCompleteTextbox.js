import React, {
	useState
} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
	getFuzzyAddressMatch,
	getPreciseAddressMatch
} from './smartyStreetsClient.js';

export default function AutocompleteTextbox() {
	const [options, setOptions] = React.useState([]);

	const onChangeHandle = async value => {
		const addressMatchResults = getFuzzyAddressMatch(value);

		if (addressMatchResults != null) {
			setOptions(addressMatchResults.map(options => options));
		}
	};

	return ( <
		Autocomplete id = "asynchronous-demo"
		style = {
			{
				width: 300
			}
		}
		getOptionSelected = {
			(option, value) => option.secondary === "Apt"
		}
		getOptionLabel = {
			option => getLabelforSuggestion(option)
		}
		options = {
			options
		}

		renderInput = {
			params => ( <
				TextField {
					...params
				}
				label = "Street Address"
				variant = "outlined"
				onChange = {
					ev => {
						// dont fire API if the user delete or not entered anything
						if (ev.target.value !== "" || ev.target.value !== null) {
							onChangeHandle(ev.target.value);
						}

						// TODO: if the field is cleared clear the list
					}
				}
				InputProps = {
					{
						...params.InputProps
					}
				}
				/>
			)
		}
		/>
	);
}

function getLabelforSuggestion(suggestion) {
  const label = suggestion.streetLine + " " + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode

  return label + suggestion.entries > 1 ? " (" + suggestion.entries + " additional results)" : "";
}
