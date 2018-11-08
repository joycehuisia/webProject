/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tutorial.css';
import { SideNav, Nav } from 'react-sidenav';
import displaycomponent from './displaycomponent';

class Tutorial extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pageId: PropTypes.string,
        filepath: PropTypes.string
      })
    ).isRequired,
  };

  onItemSelection = (arg) => {
    this.setState({selectedPath: arg.path});
    getInfo(arg.payload.filepath)
      .then((data) => {
        return <displaycomponent data={data} />
      });
  }

  render() {
    return (
      <div>
        <SideNav
          onItemSelection={this.onItemSelection}>
        {
          this.props.menu.map(item => (
            <Nav key={item.pageId} id={item.pageId} payload={item}>
              {item.name}
            </Nav>
          ))}
        </SideNav>
        <div>
        </div>
      </div>
    );
  }
}


function getInfo(path) {
  return fetch('http://localhost:3000/notes/'+path)
    .then(function(resp) {
      return resp.json();
    }).then(function(body) {
      return body;
    })
}


export default withStyles(s)(Tutorial);
