import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';

	

//~ class ButtonDialog extends React.Component {
	//~ constructor(props) {
		//~ super(props);
		//~ this.state = {active: props.active};
		//~ this.label = props.label;
		//~ this.actions = props.actions;
		//~ this.children = props.children;
		//~ this.inverse = props.inverse;
		
		//~ this.toggle = this.toggle.bind(this);
	//~ }
	
	//~ toggle () {
		//~ this.setState({active: !this.state.active});
	//~ }
	
	//~ render() {
		//~ return (
		//~ <div>
			//~ <Button label={this.label} inverse={this.inverse} onClick={this.toggle} />
			//~ <Dialog actions={this.actions} active={this.state.active}
					//~ onEscKeyDown={this.toggle} onOverlayClick={this.toggle}
					//~ title={this.label} >
				//~ {this.children}
			//~ </Dialog>
		//~ </div>
		//~ );
	//~ }
//~ }

const ButtonDialog = ({active, label, actions, hideDialog, children}) => {
	return (
	//~ <div>
		//~ <Button label={props.label} inverse={props.inverse} onClick={props.showDialog} />
		<Dialog actions={actions} active={active}
				onEscKeyDown={hideDialog} onOverlayClick={hideDialog}
				title={label} >
			{children}
		</Dialog>
	//~ </div>
	);
}

export default ButtonDialog;
