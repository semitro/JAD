import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import Layout, {Panel} from 'react-toolbox/lib/layout';
import LoginPage from './components/login_page.js';
import LabAppBar from './components/lab_app_bar.js';
import ajaxpost from './ajax.js';

const backend_path = "/";

ReactDOM.render(
	<Layout>
		<Panel>
			<LabAppBar />
			<LoginPage handleLoginSubmit={o=>{
				ajaxpost(
					backend_path+"user/login",
					"{'name':'"+o.name+"', 'password':'"+o.password+"'}",
					(response, code)=>{
						var o;
						if(code=="success") {
							o = eval(response);
						}
						else {
						
						}
					}
				)
			}}/>
		</Panel>
	</Layout>,
	document.getElementById('app')
);
