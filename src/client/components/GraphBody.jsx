import React, { Component } from 'react';
import { render } from 'react-dom';
import Victory from './VictoryTutorial';

class GraphBody extends Component {
	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	var el = this.getDOMNode();
	// 	d3Chart.create(el, {
	// 		width: '100%',
	// 		height: '300px',
	// 	}, this.getChartState());
	// }


	render() {
		return(
			<div>
				<Victory />

			</div>
		)
	}
}

export default GraphBody;


// http://formidable.com/open-source/victory/guides/pan-and-zoom
// tool-tips with victory labs 
// http://blog.scottlogic.com/2014/09/19/interactive.html
// https://www.amcharts.com/demos/line-chart-with-scroll-and-zoom/
