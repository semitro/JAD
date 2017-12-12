import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {name: '', password: ''};
		
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = props.onSubmit;
	}

	handleNameChange(str) {
		this.setState({name: str});
	}

	handlePasswordChange(str) {
		this.setState({password: str});
	}
	
	render() {
		return (
			<form>
				<Input type='text' label='Имя пользователя' name="name" icon="account_circle"
					value={this.state.name} onChange={this.handleNameChange} required />
				<Input type="password" label="Пароль" name="password" icon="pregnant_woman"
					value={this.state.password} onChange={this.handlePasswordChange} required />
				<button
					onClick={(e)=>{
						e.preventDefault();
						this.handleSubmit({name:this.state.name, password:this.state.password});
					}}
				>
					Войти полностью
				</button>
			</form>
		);
	}
}

const LoginPage = ({handleLoginSubmit}) => (
	<div>
		<LoginForm onSubmit={handleLoginSubmit}/>
	</div>
);

LoginPage.propTypes = {
	handleLoginSubmit: PropTypes.func.isRequired  
}

export default LoginPage;
