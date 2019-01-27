/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Promise from 'promise';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tutorial.css';
import Displaycomponent from './displaycomponent';
import { SideNav, Nav } from 'react-sidenav';

function getInfo(path) {
  return fetch(`http://localhost:3000/notes-en/${path}`)
    .then(resp => resp.json())
    .then(body => body)
    .catch(() => Promise.reject({ error: 'Failed to load data' }));
}

class Tutorial extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pageId: PropTypes.string,
        filepath: PropTypes.string,
      }),
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  onItemSelection = arg => {
    if (!arg.payload) {
      return;
    }
    this.setState({ selectedPath: arg.path });
    getInfo(arg.payload.filepath)
      .then(data => {
        this.setState({ data });
      })
      .catch(data => {
        console.info(data);
      });
  };

  render() {
    return (
      <div>
        <div className={s.sidenav}>
          <SideNav
            onItemSelection={this.onItemSelection}
            defaultSelectedPath={this.props.menu[0].pageId}
          >
            {this.props.menu.map(item => (
              <Nav key={item.pageId} id={item.pageId} payload={item}>
                {item.name}
              </Nav>
            ))}
          </SideNav>
        </div>
        <div className={s.main}>
          <Displaycomponent data={this.state.data.data} />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Tutorial);
