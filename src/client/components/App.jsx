import React from 'react';
import { render } from 'react-dom';
import GraphBody from './GraphBody';
import Header from './Header';

class App extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Header />
					<GraphBody />
				</div>
			</div>
		)
	}
}

export default App;