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

const title = 'Tutorial';

function action() {
  return {
    chunks: ['tutorial'],
    title,
    component: (
      <Layout>
        <Tutorial />
      </Layout>
    ),
  };
}

export default action;
