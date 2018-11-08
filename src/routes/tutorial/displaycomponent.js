import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tutorial.css';



class displaycomponent extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        data: PropTypes.string,
      }),
    ).isRequired,
  };

  MyComponent(props) {
  	let item = props.item;
  	switch(item.type) {
  		case "text":
  			return (<div>{item.data}</div>);
  		case "video":
  			return (<video src={item.data} />);
  		case "image":
  			return (<img src={item.data} />);
  	}
  }

  render() {
  	return (
  		<div>
  		{	
  			this.props.data.map(item =>
  				<MyComponent data={item} />
  			)
  		}
  		</div>
  	)
  }

}


export default withStyles(s)(displaycomponent);