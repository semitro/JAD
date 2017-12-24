export function changeUserName(value) {
	return {
		type: 'USER_NAME',
		text: value
	}
}

export function changePassword(value) {
	return {
		type: 'USER_PASSWORD',
		text: value
	}
}

export function login(token) {
	return {
		type: 'LOGIN',
		token: token
	}
}

export function logout() {
	return {
		type: 'LOGOUT'
	}
}

export function showLogin(activ) {
	return {
		type: 'SHOW_LOGIN',
		active: activ
	}
}

export function showRegister(activ) {
	return {
		type: 'SHOW_REG',
		active: activ
	}
}

export function addNewPoint(point) {
	return {
		type: 'POINTS_ADD',
		point: point
	}
}

export function clearPoints() {
	return {
		type: 'POINTS_CLEAR'
	}
}

export function enterDataX(value) {
	return {
		type: 'ENTER_DATA_X',
		value: value
	}
}

export function enterDataY(value) {
	return {
		type: 'ENTER_DATA_Y',
		value: value
	}
}

export function enterDataR(value) {
	return {
		type: 'ENTER_DATA_R',
		value: value
	}
}

export function errorHide() {
	return {
		type: 'ERROR_HIDE'
	}
}


export function errorShow(msg) {
	return {
		type: 'ERROR_SHOW',
		message: msg
	}
}

export function messageHide() {
	return {
		type: 'MESSAGE_HIDE'
	}
}


export function messageShow(msg) {
	return {
		type: 'MESSAGE_SHOW',
		message: msg
	}
}
