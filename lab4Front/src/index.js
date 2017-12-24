import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import Button from 'react-toolbox/lib/button';
import Layout, {Panel} from 'react-toolbox/lib/layout';
import Table from './components/table.js';
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
const regmsg = "Вы успешно зарегистрировались!";

const ZeroX = 125, ZeroY = 125, offsetR = 225;
const HitColor = "#ffaa00", NotHitColor = "#ff0000", UndeterminedHitColor = "#000";

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
		<Snackbar label={message} action='OK' onClick={hideError} onTimeout={hideError}
				timeout={timeout} type='cancel' active={visible} />
	);
};

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

const MessageBar = ({visible, hideMessage, message, timeout}) => {
	return (
		<Snackbar label={message} action='OK' onClick={hideMessage} onTimeout={hideMessage}
				timeout={timeout} type='accept' active={visible} />
	);
};

const CMessageBar = connect (
	state => {
		return {
			visible: state.message.visible,
			message: state.message.message,
			timeout: 5000
		}
	},
	dispatch => {
		return {
			hideMessage: ()=>dispatch(actions.messageHide())
		}
	}
)(MessageBar);

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

const Canvas = (props)=> (
	<div style={{position: 'relative'}} onMouseDown={props.onMouseDown}
			onTouchStart={props.onTouchStart}>
		<canvas id="plotCanvas" width={props.width} height={props.height}
				style={{width: props.width+"px", height: props.height+"px"}}
				onClick={props.onClick}></canvas>
		{props.children}
	</div>
);
const RippleCanvas = Ripple({spread: 3})(Canvas);
const ImageClicker = ({width, height, onClick, children}) => {
	return (
		<div id="imageWrapper" style={{width: width+"px", height: height+"px"}}>
            <RippleCanvas width={width} height={height} onClick={onClick} />
            <img src="areas-crop.png" style={{width: width+"px", height: height+"px"}} />
        </div>
	);
}

const TableModel = {
	x: {type: String, style: {width: '135px'}},
	y: {type: String, style: {width: '135px'}},
	r: {type: String, style: {width: '135px'}},
	hit: {type: Boolean, heading: 'Попали?', style: {width: '65px'}}
};
const Check = ({variable, value, onClick, className}) => (
	<Checkbox key={value.toString()} checked={variable==value} label={value} onChange={()=>onClick(value)}
			className='inline width50' />
);
const CheckContainer = ({label, children, labelStyle}) => (
	<div style={{marginTop: '10px', marginBottom: '10px'}}>
		<div style={Object.assign(
			{fontSize: '130%', fontWeight: 'bold', float: 'left', textAlign: 'center'},
			labelStyle)}>
			{label}
		</div>
		<div style={{clear: 'both'}} />
		<div>{children}</div>
		<div style={{clear: 'both'}} />
	</div>
);
const WorkPage = ({visible, onLogout, data, x, y, r, onX, onY, onR, onAdd, onImageClick}) => {
	return (visible && (
	<div>
		<LabAppBar>
			<Button label='Выйти' inverse onClick={onLogout} />
		</LabAppBar>
		<ImageClicker width={250} height={250} onClick={onImageClick}/>
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
		<Button label="Добавить точку" onClick={onAdd} raised />
        {store.getState().data.length > 0 && (
			<Table model={TableModel} source={data} />
		)}
	</div>
	));
};

function calculatePlotX(clickOffsetX, currentR) {
    return currentR * ( (clickOffsetX-ZeroX)/(offsetR - ZeroX));
}
function calculatePlotY(clickOffsetY, currentR) {
    return currentR * ( (clickOffsetY-ZeroY)/(ZeroY - offsetR));
}
function drawPoint(x, y,color) {
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.arc(x,y,2,0,2*Math.PI);
    //~ ctx.arc(x,y,4,0,2*Math.PI);
    ctx.stroke();
}
function clearCanvas() {	
    var c = document.getElementById("plotCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0,0,1000,1000);
}

function onPlotClick(ev){
    var R = parseFloat(store.getState().dataEntry.r);
    var offX, offY;
    if(ev.offsetX === undefined) {
		offX = ev.nativeEvent.offsetX;
		offY = ev.nativeEvent.offsetY;
	}
	else {
		offX = ev.offsetX;
		offY = ev.offsetY;
	}
    // Пересчёт в координаты математической модели
    var x = calculatePlotX(offX, R);
    var y = calculatePlotY(offY, R);
    drawPoint(offX, offY, UndeterminedHitColor);
    doAddPoints({x: x, y: y, r: R, xoff: offX, yoff: offY});
    store.dispatch(actions.addNewDrawnPoint({x: x, y: y}));
}

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
		var state = store.getState();
		return {
			onLogout: ()=>doLogout(),
			onX: (n)=>dispatch(actions.enterDataX(n)),
			onY: (n)=>dispatch(actions.enterDataY(n)),
			onR: (n)=>{doRecheckPoints(n); dispatch(actions.enterDataR(n));},
			onAdd: () => {
				let p = store.getState().dataEntry;
				if(!p.x) dispatch(actions.enterDataX("0"));
				if(!p.y) dispatch(actions.enterDataY("0"));
				if(!p.r) dispatch(actions.enterDataR("0"));
				doAddPoints(store.getState().dataEntry);
			},
			onImageClick: onPlotClick
		}
	}
)(WorkPage);

const querize = (pt) => {
	if(pt.xoff === undefined) {pt.xoff = "undefined"; pt.yoff = "0";}
	return '{"x":"'+pt.x+'", "y":"'+pt.y+'", "r":"'+pt.r+'", "xoff":"'+
		pt.xoff+'", "yoff":"'+pt.yoff+'"}\n'
};
const doAddPoints = (points) => {
	if(points === undefined) return;
	let pts = points;
	if(!Array.isArray(pts))
		pts = [points];
		
	let query = '{"authToken":"'+store.getState().token+'", "save":true, "points":[\n';
	query = query + querize(pts[0]);
	for(var i = 1; i<pts.length; i++) {
		query = query + ',' + querize(pts[i]);
	}
	query = query+']}';
	queryServer("points/add", query,
		(o) => {
			store.dispatch(actions.addNewPoint(o.points));
			for(var i = 0; i < o.points.length; i++) {
				var point = o.points[i];
				if(point.xoff != "undefined") {
					drawPoint(
							parseFloat(point.xoff),
							parseFloat(point.yoff),
							(point.hit ? HitColor : NotHitColor)
					);
				}
			}
		}
	)
};

const doRecheckPoints = (R) => {
	var pts = store.getState().dataDrawn;
	if (!pts.length) return;
	let query = '{"authToken":"'+store.getState().token+'", "save":true, "points":[\n';
	for (var i = 0; i < pts.length; i++) {
		let p = pts[i];
		let xoff, yoff;
		if (R === 0) {
			if (p.x == 0 && p.y == 0) {
				xoff = ZeroX;
				yoff = ZeroY;
			}
			else {
				xoff = "undefined";
				yoff = "0";
			}
		}
		else {
			xoff = (p.x/R)*(offsetR-ZeroX) + ZeroX;
			yoff = (-p.y/R)*(offsetR-ZeroY) + ZeroY;
		}
		if (i!=0)
			query = query + ',';
		query = query + querize({x: p.x, y: p.y, r: R, xoff: xoff, yoff: yoff});
	}
	query = query+']}';
	queryServer("points/add", query,
		(o) => {
			store.dispatch(actions.addNewPoint(o.points));
			clearCanvas();
			for(var i = 0; i < o.points.length; i++) {
				var point = o.points[i];
				if (point.xoff != "undefined") {
					drawPoint(
						parseFloat(point.xoff),
						parseFloat(point.yoff),
						(point.hit ? HitColor : NotHitColor)
					);
				}
			}
		}
	)	
};

const doGetPoints = () => {
	queryServer("points/get", '{"authToken":"'+store.getState().token+'"}',
		(o) => {
			store.dispatch(actions.addNewPoint(o.points));		
		}
	)
};

const doLogin = () => {
	let state = store.getState();
	if(state.user.name != "" && state.user.password != "") {
		queryServer("user/login", '{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
			(o) => {
				store.dispatch(actions.showLogin(false));
				store.dispatch(actions.login(o.authToken));
				doGetPoints();
			}
		)
	}
	else {
		store.dispatch(actions.errorShow("Пожалуйста, введите имя пользователя пароль"));
	}
};

const doRegister = () => {
	let state = store.getState();
	if(state.user.name != "" && state.user.password != "") {
		queryServer("user/register", '{"name":"'+store.getState().user.name+'", "password":"'+store.getState().user.password+'"}',
			(o) => {
				store.dispatch(actions.showRegister(false));
				store.dispatch(actions.login(o.authToken));
				store.dispatch(actions.messageShow(regmsg));
				doGetPoints();
			}
		)
	}
	else {
		store.dispatch(actions.errorShow("Пожалуйста, введите имя пользователя и пароль"));
	}
};

const doLogout = () => {
	queryServer("user/logout", '{"authToken":"'+store.getState().token+'"}',
		(o) => {
			store.dispatch(actions.logout());
			store.dispatch(actions.clearPoints());
		}
	)
};

const Page = (props) => (
	<Provider store={store} >
	<div>
		<CLoginPage />
		<CWorkPage />
		<CErrorBar />
		<CMessageBar />
	</div>
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
