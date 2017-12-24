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
		case 'LOGOUT':
			return "";
		default:
			return state;
	}
}
function setPassword(state = "", action) {
	switch(action.type) {
		case 'USER_PASSWORD':
			return action.text;
		case 'LOGOUT':
			return "";
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

function setPoints(state = [], action) {
	switch(action.type) {
		case 'POINTS_ADD':
			return state.concat([action.point]);
		case 'POINTS_CLEAR':
			return [];
		default:
			return state;
	}
}

function enterData(state = {x: 0, y: 0, r: 0}, action) {
	switch(action.type) {
		case 'ENTER_DATA_X':
			return Object.assign({}, state, {x: action.value});
		case 'ENTER_DATA_Y':
			return Object.assign({}, state, {y: action.value});
		case 'ENTER_DATA_R':
			return Object.assign({}, state, {r: action.value});
		case 'LOGOUT':
			return {x: 0, y: 0, r: 0};
		default:
			return state;
	}
}

function showErrors(state = {visible: false, message: ""}, action) {
	switch(action.type) {
		case 'ERROR_HIDE':
			return Object.assign({}, state, {visible: false});
		case 'ERROR_SHOW':
			return {visible: true, message: action.message};
		default:
			return state;
	}
}

function showMessages(state = {visible: false, message: ""}, action) {
	switch(action.type) {
		case 'MESSAGE_HIDE':
			return Object.assign({}, state, {visible: false});
		case 'MESSAGE_SHOW':
			return {visible: true, message: action.message};
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
	forms: formsReducer,
	data: setPoints,
	dataEntry: enterData,
	error: showErrors,
	message: showMessages
});

export default reducer;
