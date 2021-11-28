import { AUTH } from '../components/constants/actionTypes';
// import * as api from '../api/index.js';

export const signin = ( authFormData, history ) => async(dispatch) => {
	try {
		//log in the user
		history.push('/');
	} catch (error) {
		console.log(error);
	}
}

export const signup = ( authFormData, history ) => async(dispatch) => {
	try {
		//sign up the user
		history.push('/');
	} catch (error) {
		console.log(error);
	}
}

