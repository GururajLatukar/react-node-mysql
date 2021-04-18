import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import AutheticatedComponent from './AutheticatedComponent';
import Login from './Login';
import Protected from './Protected';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
        <AutheticatedComponent>
          <Route path="/protected" component={Protected} />
        </AutheticatedComponent>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
