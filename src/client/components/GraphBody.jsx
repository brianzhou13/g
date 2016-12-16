import React, { Component } from 'react';
import { render } from 'react-dom';
import Victory from './VictoryTutorial';
import LongScroll from './LongScroll';
import axios from 'axios';
var $ = require('jquery');


class GraphBody extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curr: {},
			data: [],
		};

		this.getData = this.getData.bind(this);
		this.getData();
	}


	componentDidMount() {
		// once component mounts, we can have it check every hour for new data
		setInterval(() => {
			this.getData();
		}, 1000 * 60 * 60);
		// setInterval(() => {
		// 	this.getData();
		// }, 1000);
	}

	componentWillUpdate (nextProps, nextState) {
		console.log(`nextState: ${nextState}`);
		console.log(`nextProps: ${nextProps}`);
		debugger;
	}

	/*
	 * @ name: getData
	 * @ input: n/a
	 * @ output: n/a
	 * @ fn: updates the state with data retrieved from API call
	 */
	getData () {
		axios.get('/api/get-data')
			.then((resp) => {
				// resp seems to come in properly
				this.setState({
					data: resp.data
				});
				console.log(`end of -getData`);
			})
			.catch((err) => {
				console.log(`error occurred in the getData method: ${err}`);
			});
	}

	/*
	 * @ name: elementClicked
	 * @ input: element clicked on the Victory graph
	 * @ output: n/a
	 * @ fn: sends the element clicked to global app-state
	 */
	elementClicked(elem) {
		this.setState({
			curr: elem
		});
	}

	elementHovered(elem) {
		console.log(`elem hovered over ${elem}`);
	}
	// <div>
	// 	<Victory curr={this.state.curr} getCurr={this.elementClicked.bind(this)} data={this.state.data}/>
	// </div>

	render() {
		return(
			<div className='graph-body'>
				<div>
					<Victory curr={this.state.curr} getCurr={this.elementClicked.bind(this)} data={this.state.data}/>
				</div>
				<div>
					<LongScroll curr={this.state.curr} getCurr={this.elementClicked.bind(this)} data={this.state.data}/>
				</div>
			</div>
		)
	}
}

export default GraphBody;

