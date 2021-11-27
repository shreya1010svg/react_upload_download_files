import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from '../components/App';
import Header from '../components/Header';
import FilesList from '../components/FilesList';
import Auth from '../components/Auth';
import useStyles from './styles';

const AppRouter = () =>{ 
	const classes = useStyles();
return (
  <BrowserRouter>
    <div className="container">
      <Header className={classes.mainContainer}/>
      <div>
        <Switch>
          <Route component={FilesList} path="/" exact={true} />
	  <Route component={App} path="/addFile" />
	  <Route component={Auth} exact path="/auth" />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);}

export default AppRouter;

