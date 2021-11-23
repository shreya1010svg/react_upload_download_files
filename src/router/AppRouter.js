import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Header from '../components/Header';
import FilesList from '../components/FilesList';

const AppRouter = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={FilesList} path="/" exact={true} />
	  <Route component={App} path="/addFile" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;

