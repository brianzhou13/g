import React, { Component } from 'react';
import { render } from 'react-dom';
import Victory from './VictoryTutorial';
import LongScroll from './LongScroll';

class GraphBody extends Component {
	constructor(props) {
		super(props);

		this.state = {
			curr: ''
		};
	}

	elementClicked(elem) {
		// this will denote the value the user clicked
		// this will then translate back down to the other view
		// for use and display
		
		this.setState({
			curr: elem
		});
	}


	render() {
		return(
			<div className='graph-body'>
				<div>
					<Victory curr={this.curr} getCurr={this.elementClicked.bind(this)}/>
				</div>
				<div>
					<LongScroll curr={this.curr} getCurr={this.elementClicked.bind(this)}/>
				</div>
			</div>
		)
	}
}

export default GraphBody;


// http://formidable.com/open-source/victory/guides/pan-and-zoom
// tool-tips with victory labs 
// http://blog.scottlogic.com/2014/09/19/interactive.html
// https://www.amcharts.com/demos/line-chart-with-scroll-and-zoom/
