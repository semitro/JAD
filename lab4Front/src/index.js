import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Button from 'react-toolbox/lib/button';
import Layout, {Panel} from 'react-toolbox/lib/layout';
import LoginForm from './components/login_form.js';
import LabAppBar from './components/lab_app_bar.js';
import ButtonDialog from './components/button_dialog.js';
import Dialog from 'react-toolbox/lib/dialog';
import ajaxpost from './ajax.js';
import reducer from './reducers.js';
import * as actions from './actions.js';

const backend_host = "http://localhost:12381/"
const backend_path = backend_host + "lab4Rest-16832552988866737753.0-SNAPSHOT/api/";

const store = createStore(reducer);

const CLoginForm = connect (
	state => {
		return {
			name: state.user.name, password: state.user.password
		}
	},
	dispatch => {
		return {
			onNameChange: str => {store.dispatch(actions.changeUserName(str))},
			onPasswordChange: str => {store.dispatch(actions.changePassword(str))}
		}
	}
)(LoginForm);

const CLoginDialog = connect (
	state => {
		return {
			active: state.forms.login,
			label: 'Login',
			actions: [{label:'Login', onClick: ()=>doLogin()}]
		}
	},
	dispatch => {
		return {
			hideDialog: ()=>{store.dispatch(actions.showLogin(false))}
		}
	}
)(ButtonDialog);

const CRegDialog = connect (
	state => {
		return {
			active: state.forms.register,
			label: 'Register',
			actions: [{label:'Register', onClick: ()=>doRegister()}]
		}
	},
	dispatch => {
		return {
			hideDialog: ()=>{store.dispatch(actions.showRegister(false))}
		}
	}
)(ButtonDialog);

const LoginPage = ({visible, onLogin, onRegister}) => {
	return (visible && (
	<div>
		<LabAppBar>
			<Button label="Вход" inverse onClick={onLogin} />
			<Button label="Регистрация" inverse onClick={onRegister} />
		</LabAppBar>
		<CLoginDialog>
			<CLoginForm />
		</CLoginDialog>
		<CRegDialog>
			<CLoginForm />
		</CRegDialog>
	</div>
	));
};

const CLoginPage = connect (
	state => {
		return {visible: (state.token == "")}
	},
	dispatch => {
		return {
			onLogin: ()=>store.dispatch(actions.showLogin(true)),
			onRegister: ()=>store.dispatch(actions.showRegister(true))
		}
	}
)(LoginPage);

const WorkPage = ({visible, onLogout}) => {
	return (visible && (
	<div>
		<LabAppBar>
			<Button label='Выйти' inverse onClick={onLogout} />
		</LabAppBar>
	</div>
	));
};

const CWorkPage = connect (
	state => {
		return {
			visible: (state.token != "")
		}
	},
	dispatch => {
		return {
			onLogout: ()=>doLogout()
		}
	}
)(WorkPage);

const doLogin = () => {
	store.dispatch(actions.showLogin(false));
	ajaxpost(
		backend_path+"user/login",
		'{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
		(response, code)=>{
			var o;
			o = eval('('+response+')');
			//~ alert(response);
			if(o.token != "") {
				store.dispatch(actions.login(o.authToken));
			}
			else {
				alert(o.error);
			}
		}
	)
}

const doRegister = () => {
	store.dispatch(actions.showRegister(false));
	ajaxpost(
		backend_path+"user/register",
		'{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
		(response, code)=>{
			var o;
			o = eval('('+response+')');
			if(o.success) {
				store.dispatch(actions.login(o.authToken));
			}
			else {
				alert(o.error);
			}			
		}
	)
}

const doLogout = () => {
	
}

store.dispatch(actions.showLogin(false));
store.dispatch(actions.showRegister(false));
store.dispatch(actions.logout());

const Page = (props) => (
	<Provider store={store} >
	<Layout>
		<Panel>
			<CLoginPage />
			<CWorkPage />
		</Panel>
	</Layout>
	</Provider>
);

ReactDOM.render(
	<Page />,
	document.getElementById('app')
);

				//~ <Dialog actions={[
							//~ {label:'Register', onClick: ()=>doRegister()}
						//~ ]}
						//~ active={store.getState().forms.register}
						//~ onEscKeyDown={()=>store.dispatch(actions.showRegister(false))}
						//~ onOverlayClick={()=>store.dispatch(actions.showRegister(false))} 
						//~ title="Регистрация">
					//~ <CLoginForm	/>
				//~ </Dialog>
					//~ {(store.getState().forms.login &&
					//~ <Dialog actions={[
								//~ {label:'Login', onClick: ()=>doLogin()}
							//~ ]}
							//~ active={store.getState().forms.login}
							//~ onEscKeyDown={()=>store.dispatch(actions.showLogin(false))}
							//~ onOverlayClick={()=>store.dispatch(actions.showLogin(false))} 
							//~ title="Вход">
						//~ <CLoginForm	/>
					//~ </Dialog>		
					//~ )}

					//~ <LoginForm buttonLabel='Войти' onSubmit={o=>{
						//~ ajaxpost(
							//~ backend_path+"user/login",
							//~ '{"name":"'+o.name+'", "password":"'+o.password+'"}',
							//~ (response, code)=>{
								//~ var o;
								//~ if(code=="success") {
									//~ o = eval('('+response+')');
									//~ console.log(o);
								//~ }
								//~ else {
								
								//~ }
							//~ }
						//~ )
					//~ }} />
			//~ <LoginPage handleLoginSubmit={o=>{
				//~ ajaxpost(
					//~ backend_path+"user/login",
					//~ '{"name":"'+o.name+'", "password":"'+o.password+'"}',
					//~ (response, code)=>{
						//~ var o;
						//~ if(code=="success") {
							//~ o = eval('('+response+')');
							//~ console.log(o);
						//~ }
						//~ else {
						
						//~ }
					//~ }
				//~ )
			//~ }}/
