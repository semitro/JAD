import React from 'react';
import ReactDOM from 'react-dom';
import Checkbox from 'react-toolbox/lib/checkbox';

const Table = ({model, source}) => {
	var doRow = (model, ob, i) => {
		return (
		<tr key={i.toString()}>{
			Object.entries(model).map((entry) => {
				let content = ob[entry[0]] === undefined ? null : ob[entry[0]];
				let thing;
				if(entry[1].type === Boolean)
					thing = (<Checkbox checked={content} />);
				else						
					thing = (<span>{content.toString()}</span>);
				return (
					<td key={entry[0]}>{thing}</td>
				);
			})
		}</tr>
		);
	}
	
	return (
	<table>
		<thead><tr>{
			Object.entries(model).map((entry) => {
				if (entry[1].heading !== undefined)
					return (<th key={entry[0]}>{entry[1].heading}</th>);
				else
					return (<th key={entry[0]}>{entry[0].toUpperCase()}</th>);
			})
		}</tr></thead>
		<tbody>{
			source.map((ob, index) => {
				return doRow(model, ob, index);
			})
		}</tbody>
	</table>
	);
}

export default Table;
