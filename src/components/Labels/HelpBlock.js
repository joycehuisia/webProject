import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import l from './Labels.css';

class Labels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: true
    }
  }
  render() {
    if(!this.state.valid) {
      return (
        <div className={l.basicLabel}>
          {this.props.message}
        </div>
      );
    }

    return (null);
  }
}

export default withStyles(l)(Labels);
