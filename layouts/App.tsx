import React, { FC } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import loadable from '@loadable/component';

// import Login from '@pages/Login';
// import SingUp from '@pages/SingUp';
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App: FC = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login"></Redirect>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
};

export default App;
