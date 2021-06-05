import Login from '@pages/Login';
import SingUp from '@pages/SingUp';
import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"></Redirect>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SingUp} />
    </Switch>
  );
};

export default App;
