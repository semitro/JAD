import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';

const LoginForm = ({name, password, onNameChange, onPasswordChange}) => {
	return (
	<div>
		<Input type='text' label='Имя пользователя' name="name" icon="account_circle"
			value={name} onChange={onNameChange} required />
		<Input type="password" label="Пароль" name="password" icon="pregnant_woman"
			value={password} onChange={onPasswordChange} required />
	</div>
	);
}

//~ class LoginForm extends React.Component {
	//~ constructor(props) {
		//~ super(props);
		//~ this.state = {name: '', password: ''};
		
		//~ this.handleNameChange = this.handleNameChange.bind(this);
		//~ this.handlePasswordChange = this.handlePasswordChange.bind(this);
		//~ this.handleSubmit = props.onSubmit;
	//~ }

	//~ handleNameChange(str) {
		//~ this.setState({name: str});
	//~ }

	//~ handlePasswordChange(str) {
		//~ this.setState({password: str});
	//~ }
	
	//~ render() {
		//~ return (
		//~ <div>
			//~ <Input type='text' label='Имя пользователя' name="name" icon="account_circle"
				//~ value={this.state.name} onChange={this.handleNameChange} required />
			//~ <Input type="password" label="Пароль" name="password" icon="pregnant_woman"
				//~ value={this.state.password} onChange={this.handlePasswordChange} required />Label}
			//~ </Button>
		//~ </div>
		//~ );
	//~ }
//~ }

//~ LoginForm.propTypes = {
	//~ onSubmit: PropTypes.func.isRequired
//~ }

export default LoginForm;
