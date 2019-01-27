import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

function renderHTML(data) {
  return {
    __html: data,
  };
}

class MyComponent extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      type: PropTypes.string.isRequired,
      data: PropTypes.string,
    }).isRequired,
  };

  render() {
    const item = this.props.data;
    switch (item.type) {
      case 'text':
        return <div dangerouslySetInnerHTML={renderHTML(item.data)} />;
      case 'video':
        return <iframe height="10%" width="80%"
                    data-youtube-id={item.youtubeId}
                    src={item.data} />;
      case 'image':
        return <img src={item.data} alt="" />;
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
    if (!this.props.data) {
      return null;
    }
    return (
      <div>
        {this.props.data &&
          this.props.data.map(item => (
            <MyComponent key={item.id} data={item} />
          ))}
      </div>
    );
  }
}

export default Displaycomponent;
