import UsageChart from './Components/UsageChart';
import Title from './Components/Title';
import GridContainer from './Components/GridContainer';
import { Component } from 'react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	render() {
		return (
			<>
				<Title>GetTam Analytics</Title>

				<GridContainer>
					<UsageChart appState={this.state} />
					<UsageChart appState={this.state} />

					<UsageChart appState={this.state} />
					<UsageChart appState={this.state} />
				</GridContainer>
			</>
		);
	}
}

export default App;
