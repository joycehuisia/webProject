
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HelpBlock from '../labels/HelpBlock';
import s from './Input.css';

/*
Expected Props are:
defaultValue: (String) the default value displayed on the input field
defaultValidationState: (boolean) the default validation state of the input field
name: (String) the id of the input field
validation: {EMAIL|PASSWORD|NOTEMPTY|NONE} which type of validation is suppoerted
hasErrorMessage: (boolean) Does the input field need an error message if validation fails
errorMessage: (String) The error message displayed if validation fails
type: {string} The input field type. Defaults to text
*/

class Input extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			validValue: this.props.defaultValidationState || true
		}

		this.validate = this.validate.bind(this);
	}

	validate(event) {
		var regex = /[^\s]/;
		switch(this.props.validation) {
			case "EMAIL":
			    regex=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
				break;
			case "PASSWORD":
				console.log('passwordcheck');
				regex=/^(?=[^\d_].*?\d)\w(\w|[!@#$%.]){10,}/;
				break;
			case "NOTEMPTY":
				break;
			case "NONE":
			case "default":
				return;
		}

		if(regex.test(event.target.value)) {
	      	this.setState({
	      		validValue: true
	      	})
	    } else {
	      	this.setState({
	      		validValue: false
	      	})
	    }

	    this.props.saveInputToState(event);
	}

	render() {
        return(
        	<div>
	        	<input
		          id={this.props.id}
		          className={s.input}
		          type={this.props.type === "password" ? "password" : "text"}
		          onChange={this.validate}
		          autoComplete="off"
		          required="true"
		          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
		        />
		        {!this.state.validValue && this.props.hasErrorMessage && 
			        <div style={{color:"red"}}>
			          {this.props.errorMessage}
			        </div>
			    }
	        </div>
	    )
	}
}

export default Input;