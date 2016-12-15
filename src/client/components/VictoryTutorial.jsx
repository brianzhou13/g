import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import axios from 'axios';
import { VictoryBar } from 'victory';

/* example of a data entry
	{
		"bg_value": 150,
		// "timestamp": "2015-04-15T11:15:34",
		"timestamp": 15,
		"meal": "before_meal"
	},
*/

class Main extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: ''
		};

		this.getData = this.getData.bind(this);
	}

	componentWillMount() {
		// ivoked immediately before mounting-- called before render
		this.getData();
	}

	componentDidMount() {
		// once component mounts, we can have it check every hour for new data
		setInterval(() => {
			this.getData();
		}, 60 * 60 * 1000)
	}

	getData () {
		//
		axios.get('/api/get-data')
			.then((resp) => {
				// console.log(`resp value is: ${resp}`);
				// resp seems to come in properly

				this.setState({
					data: resp.data
				});
			})
			.catch((err) => {
				console.log(`error occurred in the getData method: ${err}`);
			});
	}

	render() {
		const data_v = [
		  {quarter: 1, earnings: 13000},
		  {quarter: 2, earnings: 16500},
		  {quarter: 3, earnings: 14250},
		  {quarter: 4, earnings: 19000}
		];

		/*
		data={data_v}
		x="quarter"
		y="earnings"*/

		return (
			<div>
				<VictoryBar 
					data={this.state.data.bg_value}

				/>
			</div>
		)
	}
}

export default Main;