import { combineReducers } from 'redux';

//~ function setUser(state = {"user": "", "password": ""}, action) {
	//~ switch(action.type) {
		//~ case 'LOGIN':
			//~ return {"user": action.user,
				//~ "password": action.password};
		//~ case 'LOGOUT":
			//~ return {"user": "", "password": ""};
		//~ default:
			//~ return state;
	//~ }
//~ }

function setToken(state = "", action) {
	switch(action.type) {
		case 'LOGIN':
			return action.token;
		case 'LOGOUT':
			return "";
		default:
			return state;
	}
}

function setUserName(state = "", action) {
	switch(action.type) {
		case 'USER_NAME':
			return action.text;
		default:
			return state;
	}
}
function setPassword(state = "", action) {
	switch(action.type) {
		case 'USER_PASSWORD':
			return action.text;
		default:
			return state;
	}
}

function setLFormActive(state = false, action) {
	switch(action.type) {
		case 'SHOW_LOGIN':
			return action.active;
		default:
			return state;
	}
}
function setRFormActive(state = false, action) {
	switch(action.type) {
		case 'SHOW_REG':
			return action.active;
		default:
			return state;
	}
}

const formsReducer = combineReducers({
	login: setLFormActive,
	register: setRFormActive
});

const userReducer = combineReducers({
	name: setUserName,
	password: setPassword
});

const reducer = combineReducers({
	token: setToken,
	user: userReducer,
	forms: formsReducer
});

export default reducer;
