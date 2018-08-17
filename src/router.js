import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

const componentRoutes = {
    component: Home,
    path: '/',
    indexRoute: { component: ArtistMain },
    childRoutes: [
        {
            path: 'artists/new',
            // react router will automatically call this function to get child component
            // cb, callback
            getComponent(location, cb) {
                System.import('./components/artists/ArtistCreate') // generate a second bundle
                    .then(module => cb(null, module.default)); // 1st error
            }
        },
        {
            path: 'artists/:id',
            getComponent(location, cb) {
                System.import('./components/artists/ArtistDetail')
                    .then(module => cb(null, module.default));
            }
        },
        {
            path: 'artists/:id/edit',
            getComponent(location, cb) {
                System.import('./components/artists/ArtistEdit')
                    .then(module => cb(null, module.default));
            }
        }
    ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes} />
  );
};

export default Routes;
