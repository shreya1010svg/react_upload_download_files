import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AppBar, Typography } from '@material-ui/core';
import { Toolbar } from '@mui/material';
import useStyles from './styles';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Provider, useDispatch } from 'react-redux';
import logo from '../logo.svg';

import {createStore} from 'redux';
import rootReducer from './reducers';

const HeaderWrapper = () => {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Header/>
    </Provider>
  )
}

const Header = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(user);

  useEffect(() => {
		const token = user?.token;

		//JWT
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, []);

  const logout = () => {
	dispatch({type:'LOGOUT'});
	history.push('/');
	setUser(null);
  };

  return (
    <div className={classes.appBar}>	
        <NavLink activeClassName="active" to="/" exact={true}>
      <div className={classes.brandContainer}>
	<img src={logo} height='50px'/>
	<h1>Notomatic</h1>
      </div>	
        </NavLink>
      <Toolbar className= {classes.toolbar}>
	{user ? (
		<div className={classes.profile}>
			<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
			<Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
			<Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
		</div>
	) : (
		<NavLink activeClassName="active" to="/auth" variant="contained" colour="primary">Sign In</NavLink>
	)}
      </Toolbar>
      <nav>
        <NavLink activeClassName="active" to="/addFile">
          Add File
        </NavLink>
      </nav>
    </div>
  );
};

export default HeaderWrapper;

