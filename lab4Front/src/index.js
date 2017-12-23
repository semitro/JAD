import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Button from 'react-toolbox/lib/button';
import Layout, {Panel} from 'react-toolbox/lib/layout';
import Table from 'react-toolbox/lib/table';
import Dialog from 'react-toolbox/lib/dialog';
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import Ripple from 'react-toolbox/lib/ripple';
import Snackbar from 'react-toolbox/lib/snackbar';
import LoginForm from './components/login_form.js';
import LabAppBar from './components/lab_app_bar.js';
import ButtonDialog from './components/button_dialog.js';
import ajaxpost from './ajax.js';
import reducer from './reducers.js';
import * as actions from './actions.js';

const store = createStore(reducer);

const backend_host = "http://localhost:12381/"
const backend_path = backend_host + "lab4Rest-16832552988866737753.0-SNAPSHOT/api/";

const xhrerror = "Ошибка соединения с сервером";

function  queryServer(where, what, whatToDoWhenGood) {
	ajaxpost(
		backend_path+where,	what,
		(response, code)=>{
			var o;
			o = eval('('+response+')');
			if(o.success) {
				whatToDoWhenGood(o);			
			}
			else {
				store.dispatch(actions.errorShow("Ошибка: "+o.error));
			}
		},
		(status) => {
			store.dispatch(actions.errorShow(xhrerror));
		}
	)
}

const CLoginForm = connect (
	state => {
		return {
			name: state.user.name, password: state.user.password
		}
	},
	dispatch => {
		return {
			onNameChange: str => dispatch(actions.changeUserName(str)),
			onPasswordChange: str => dispatch(actions.changePassword(str))
		}
	}
)(LoginForm);

const CLoginDialog = connect (
	state => {
		return {
			active: state.forms.login,
			label: 'Вход',
			actions: [{label:'Войти', onClick: ()=>doLogin()}]
		}
	},
	dispatch => {
		return {
			hideDialog: ()=>dispatch(actions.showLogin(false))
		}
	}
)(ButtonDialog);

const CRegDialog = connect (
	state => {
		return {
			active: state.forms.register,
			label: 'Регистрация',
			actions: [{label:'Зарегистрироваться', onClick: ()=>doRegister()}]
		}
	},
	dispatch => {
		return {
			hideDialog: ()=>dispatch(actions.showRegister(false))
		}
	}
)(ButtonDialog);

const ErrorBar = ({visible, hideError, message, timeout}) => {
	return (
		<Snackbar label={message} action='OK' onClick={hideError} onTimeout={hideError} timeout={timeout} type='cancel' active={visible} />
	);
}

const CErrorBar = connect (
	state => {
		return {
			visible: state.error.visible,
			message: state.error.message,
			timeout: 5000
		}
	},
	dispatch => {
		return {
			hideError: ()=>dispatch(actions.errorHide())
		}
	}
)(ErrorBar);

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
			onLogin: ()=>dispatch(actions.showLogin(true)),
			onRegister: ()=>dispatch(actions.showRegister(true))
		}
	}
)(LoginPage);

const ImageClicker = ({width, height, onClick, children}) => {
	const Canvas = (props)=> (
		<div style={{position: 'relative'}} onMouseDown={props.onMouseDown}
				onTouchStart={props.onTouchStart}>
			<canvas id="plotCanvas" width={props.width} height={props.height}
					style={{width: props.width+"px", height: props.height+"px"}}
					onClick={props.onClick}></canvas>
			{props.children}
		</div>);
	const RippleCanvas = Ripple({spread: 3})(Canvas);
	const Link = (props) => (
	  <a {...props} style={{position: 'relative'}}>
		{props.children}
	  </a>
	);
	const RippleLink = Ripple({spread: 3})(Link);
	return (
		<div id="imageWrapper" style={{width: width+"px", height: height+"px"}}>
            <RippleCanvas width={width} height={height} onClick={onClick} />
            <img src="areas-crop.png" style={{width: width+"px", height: height+"px"}} />
        </div>
	);
}
const TableModel = {
	x: {type: String},
	y: {type: String},
	r: {type: String},
	hit: {type: Boolean}
};

const WorkPage = ({visible, onLogout, data, x, y, r, onX, onY, onR}) => {
	var Check = ({variable, value, onClick, className}) => (
		<Checkbox key={value.toString()} checked={variable==value} label={value} onChange={()=>onClick(value)}
				className='inline width50' />
	);
	var CheckContainer = ({label, children, labelStyle}) => (
		<div style={{marginTop: '10px'}}>
			<div style={Object.assign({},
				{fontSize: '130%', fontWeight: 'bold', float: 'left', textAlign: 'center'},
				labelStyle)}>
				{label}
			</div>
			<div style={{clear: 'both'}} />
			<div>{children}</div>
			<div style={{clear: 'both'}} />
		</div>
	);
	return (visible && (
	<div>
		<LabAppBar>
			<Button label='Выйти' inverse onClick={onLogout} />
		</LabAppBar>
		<ImageClicker width={250} height={250} onClick={()=>console.log('heh')}/>
        <form>
			<CheckContainer label='X'>
				<Check variable={x} value={-5} onClick={onX} />
				<Check variable={x} value={-4} onClick={onX} />
				<Check variable={x} value={-3} onClick={onX} />
				<Check variable={x} value={-2} onClick={onX} />
				<Check variable={x} value={-1} onClick={onX} />
				<Check variable={x} value='0' onClick={onX} />
				<Check variable={x} value={1} onClick={onX} />
				<Check variable={x} value={2} onClick={onX} />
				<Check variable={x} value={3} onClick={onX} />
			</CheckContainer>
			<CheckContainer label='Y' labelStyle={{marginBottom: '-25px'}}>
				<Input type='number' max='3' min='-5' name='y' value={y}
						onChange={(v)=>onY(v)} style={{marginLeft: '10px'}}/>
			</CheckContainer>
			<CheckContainer label='R' labelStyle={{marginTop: '-25px'}}>
				<Check variable={r} value={-5} onClick={onR} />
				<Check variable={r} value={-4} onClick={onR} />
				<Check variable={r} value={-3} onClick={onR} />
				<Check variable={r} value={-2} onClick={onR} />
				<Check variable={r} value={-1} onClick={onR} />
				<Check variable={r} value='0' onClick={onR} />
				<Check variable={r} value={1} onClick={onR} />
				<Check variable={r} value={2} onClick={onR} />
				<Check variable={r} value={3} onClick={onR} />
			</CheckContainer>
		</form>
        <table>
			<thead>
				<tr><th>X</th><th>Y</th><th>R</th><th>Попал?</th></tr>
			</thead>
			<tbody id="tbody">
			</tbody>
		</table>
	</div>
	));
};

const CWorkPage = connect (
	state => {
		return {
			visible: (state.token != ""),
			data: state.data,
			x: state.dataEntry.x,
			y: state.dataEntry.y,
			r: state.dataEntry.r
		}
	},
	dispatch => {
		return {
			onLogout: ()=>doLogout(),
			onX: (n)=>dispatch(actions.enterDataX(n)),
			onY: (n)=>dispatch(actions.enterDataY(n)),
			onR: (n)=>dispatch(actions.enterDataR(n))
		}
	}
)(WorkPage);

const doGetPoints = () => {
	queryServer("points/get", '{"authToken":"'+store.getState().token+'"}',
		(o) => {
			for(var i = 0; i < o.points.length; i++) {
				store.dispatch(actions.addNewPoint(o.points[i]));
			}				
		}
	)
};

const doLogin = () => {
	queryServer("user/login", '{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
		(o) => {
			store.dispatch(actions.showLogin(false));
			store.dispatch(actions.login(o.authToken));
			doGetPoints();
		}
	)
};

const doRegister = () => {
	queryServer("user/register", '{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
		(o) => {
			store.dispatch(actions.showRegister(false));
			store.dispatch(actions.login(o.authToken));
			doGetPoints();
		}
	)
};

const doLogout = () => {
	queryServer("user/logout", '{"authToken":"'+store.getState().token+'"}',
		(o) => {
			store.dispatch(actions.logout());
			store.dispatch(actions.clearPoints());
		}
	)
};

store.dispatch(actions.addNewPoint({x:"hey",y:"ah",r:"neigh",hit:true}));

const Page = (props) => (
	<Provider store={store} >
	<Layout>
		<Panel>
			<CLoginPage />
			<CWorkPage />
			<CErrorBar />
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
