import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Typography } from '@material-ui/core';
import { Toolbar } from '@mui/material';
import useStyles from './styles';
import { Button } from 'react-bootstrap';
import Avatar from 'react-avatar';

const Header = () => {
  const classes = useStyles();
  const user = null;

  return (
    <div className={classes.appBar}>
      <div className={classes.brandContainer}>
	<h1>Course Materials and Notes</h1>
      </div>
      <Toolbar className= {classes.toolbar}>
	{user ? (
		<div className={classes.profile}>
			<Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
			<Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
			<Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
		</div>
	) : (
		<NavLink activeClassName="active" to="/auth" variant="contained" colour="primary">Sign In</NavLink>
	)}
      </Toolbar>
      <nav>
        <NavLink activeClassName="active" to="/" exact={true}>
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/addFile">
          Add File
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;

