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
