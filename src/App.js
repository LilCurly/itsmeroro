import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import AuthenticatePage from './pages/authenticate/authenticate.component';
import Header from './components/header/header.component';
import Background from './components/background/background.component';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="lol">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/secretpageauth" component={AuthenticatePage} />
        </Switch>
        <Background />
      </div>
    )
  }
}

export default App;
