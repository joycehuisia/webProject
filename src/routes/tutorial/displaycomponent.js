import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tutorial.css';

class MyComponent extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			type: PropTypes.string.isRequired,
			data: PropTypes.string
		}).isRequired
	};

	render() {
		let item = this.props.data;
	  	switch(item.type) {
	  		case "text":
	  			return (<div>{item.data}</div>);
	  		case "video":
	  			return (<video src={item.data} />);
	  		case "image":
	  			return (<img src={item.data} />);
	  		default:
	  			return null;
	  	}
	}
}

class Displaycomponent extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        data: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
  	if(!this.props.data) {
  		return null;
  	}
  	return (
  		<div>
  		{	
  			this.props.data && this.props.data.map(item =>
  				<MyComponent key={item.id} data={item} />
  			)
  		}
  		</div>
  	)
  }

}


export default withStyles(s)(Displaycomponent);