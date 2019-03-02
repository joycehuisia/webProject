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
import axios from 'axios';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tutorial.css';
import Displaycomponent from './displaycomponent';
import { SideNav, Nav } from 'react-sidenav';

function getFeed(lang) {
  return axios.get(`/baseText/notes-${lang}.json`);
}

function getInfo(path, lang) {
  const filepath = path.filepath;
  return axios
    .get(`/notes-${lang}/${filepath}`)
    .catch(() => Promise.reject({ error: 'Failed to load data' }));
}

function getLang(lang) {
  switch (lang) {
    case 2:
      return 'zh'; // for simplified
    case 1:
      return 'ch'; // for traditional
    case 0:
    default:
      return 'en';
  }
}

class Tutorial extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pageId: PropTypes.string,
        filepath: PropTypes.string,
      }),
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      data: [],
      lang: 'en',
      currentLang: 'en',
      currentItem: null,
      selectedPath: null,
    };

    this.retrieveMenu();
  }

  onItemSelection = arg => {
    if (!arg.payload) {
      return;
    }

    this.retrieveMenuItemInfo(arg);
  };

  retrieveMenuItemInfo = arg => {
    let path;
    let selectedItem;
    console.log(arg);
    if (arg) {
      selectedItem = arg.payload;
      path = arg.path;
    }
    path = path || this.state.selectedPath || this.state.menu[0].pageId || '';
    selectedItem =
      selectedItem || this.state.currentItem || this.state.menu[0] || {};
    console.log(path);
    console.log(selectedItem);
    this.setState({ selectedPath: path });
    this.setState({ currentItem: selectedItem });
    getInfo(selectedItem, this.state.currentLang)
      .then(resp => {
        this.setState({ data: resp.data });
      })
      .catch(data => {
        console.info(data);
      });
  };

  retrieveMenu = arg => {
    getFeed(this.state.currentLang).then(data => {
      this.setState({ menu: data.data.menu });
      return this.retrieveMenuItemInfo();
    });
  };

  componentWillUpdate = (prevState, nextState) => {
    if (this.state.lang != this.state.currentLang) {
      this.setState({ currentLang: this.state.lang });
      this.retrieveMenu();
      return true;
    }
    return false;
  };

  changeLanguage = () => {
    let newLang = 'en';
    switch (this.state.lang) {
      case 'en':
        newLang = 'ch';
        break;
      case 'ch':
        newLang = 'en';
      default:
        newLang = 'en';
        break;
    }
    this.setState({ lang: newLang }, () => {
      console.log(this.state.lang);
      this.componentWillUpdate();
    });
  };

  render() {
    return (
      <div>
        <div className={s.sidenav}>
          <button onClick={this.changeLanguage}>
            {' '}
            {this.state.currentLang}{' '}
          </button>
          <SideNav onItemSelection={this.onItemSelection}>
            {this.state.menu &&
              this.state.menu.map(item => (
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
