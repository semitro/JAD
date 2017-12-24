import { combineReducers } from 'redux';

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
			if (Array.isArray(action.point))
				return state.concat(action.point);
			return state.concat([action.point]);
		case 'POINTS_CLEAR':
			return [];
		default:
			return state;
	}
}

function setDrawnPoints(state = [], action) {
	switch(action.type) {
		case 'POINTS_DRAWN_ADD':
			if (Array.isArray(action.point))
				return state.concat(action.point);
			return state.concat([action.point]);
		case 'POINTS_CLEAR':
			return [];
		default:
			return state;
	}
}

function enterData(state = {x: "0", y: "0", r: "1"}, action) {
	switch(action.type) {
		case 'ENTER_DATA_X':
			let x = action.value;
			//~ if(x == "" || x == undefined || x == false || x == null)
				//~ x = "0";
			return Object.assign({}, state, {x: x});
		case 'ENTER_DATA_Y':
			let y = action.value;
			//~ if(y == "" || y == undefined || y == false || y == null)
				//~ y = "0";
			if(y != "") {
				if (parseFloat(y) > 3) y ="3";
				else if (parseFloat(y) < -5) y = "-5";
			}
			return Object.assign({}, state, {y: y});
		case 'ENTER_DATA_R':
			let r = action.value;
			//~ if(r == "" || r == undefined || r == false || r == null)
				//~ r = "0";
			return Object.assign({}, state, {r: r});
		case 'LOGOUT':
			return {x: "0", y: "0", r: "1"};
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
	dataDrawn: setDrawnPoints,
	error: showErrors,
	message: showMessages
});

export default reducer;
