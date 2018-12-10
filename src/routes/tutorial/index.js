/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Tutorial from './Tutorial';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  var language = "en";
  const data = await getFeed();
  
  return {
    title: 'Tutorial',
    chunks: ['tutorial'],
    component: (
      <Layout>
        <Tutorial menu={data.menu} />
      </Layout>
    ),
  };
}


function getFeed() {
	return fetch('http://localhost:3000/notes-'+language+'.json')
		.then(function(resp) {
			return resp.json();
		}).then(function(body) {
			return body;
		})
}

export default action;
