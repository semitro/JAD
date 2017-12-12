import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button';
import AppBar from 'react-toolbox/lib/app_bar';
import Input from 'react-toolbox/lib/input';
import Layout, {Panel} from 'react-toolbox/lib/layout';

const LabAppBar = () => (
	<AppBar title='P3202, Буланцов, Ощепков, вариант, 4984561'/>
);

const LoginForm = (props) => (
	<form>
		<Input type='text' label='Имя пользователя' name="name" icon="account_circle" required />
		<Input type="password" label="Пароль" name="password" icon="pregnant_woman" required />
		<Button label="Войти полностью" icon="lock_open" raised accent/>
	</form>
);

ReactDOM.render(
	<Layout>
		<Panel>
			<LabAppBar />
			<LoginForm />
		</Panel>
	</Layout>,
	document.getElementById('app')
);
