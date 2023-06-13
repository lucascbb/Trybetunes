import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/trybetunes" component={ Login } />
        <Route path="/trybetunes/search" component={ Search } />
        <Route path="/trybetunes/album/:id" component={ Album } />
        <Route path="/trybetunes/favorites" component={ Favorites } />
        <Route exact path="/trybetunes/profile/" component={ Profile } />
        <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />
      </Switch>
    );
  }
}

export default Routes;
