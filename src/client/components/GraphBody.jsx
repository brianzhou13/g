import React, { Component } from 'react';
import { render } from 'react-dom';
import Victory from './VictoryTutorial';
import LongScroll from './LongScroll';
import axios from 'axios';
var $ = require('jquery');

/* ************ FOR SHORT-START INSTRUCTIONS ************ */
/* ************ UNCOMMENT LINES: 32, 33 ************ */
/* ************ AND COMMENT LINES: 25, 26, 38,  65-75,  ************ */
/* ************ /end  SHORT-START INSTRUCTIONS *************/



class GraphBody extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curr: {},
			data: [],
		};

		// COMMENT FOR SHORT-START
		// this.getData = this.getData.bind(this);
		// this.getData();
	}


	componentDidMount() {

		// UNCOMMENT FOR SHORT-START
		this.shortStartGetData = this.shortStartGetData.bind(this);
		this.shortStartGetData();

		// check every hour for data
		setInterval(() => {
			// this.getData();
		}, 1000 * 60 * 60);
		// setInterval(() => {
		// 	this.getData();
		// }, 1000);
	}

	/* 
	 * @ name: shortStartGetData
	 * @ fn: use for short-start -- will not call backend for data
	 */

	 shortStartGetData() {
	 	this.setState({
	 		data: require('../shortStartData')
	 	});
	 }

	/*
	 * @ name: getData
	 * @ input: n/a
	 * @ output: n/a
	 * @ fn: updates the state with data retrieved from API call
	 */
	getData () {

		/* ************  COMMENT BELOW OUT IF YOU WANT TO USE THE SHORT START ************ */
		// axios.get('/api/get-data')
		// 	.then((resp) => {
		// 		// resp seems to come in properly
		// 		this.setState({
		// 			data: resp.data
		// 		});
		// 		console.log(`end of -getData`);
		// 	})
		// 	.catch((err) => {
		// 		console.log(`error occurred in the getData method: ${err}`);
		// 	});
		/* *** /END SHORT-START COMMENTING */
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

