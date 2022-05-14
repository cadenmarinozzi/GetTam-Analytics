import UsageChart from './Components/UsageChart';
import Title from './Components/Title';
import GridContainer from './Components/GridContainer';
import LeaderboardChart from './Components/LeaderboardChart';
import PlayersChart from './Components/PlayersChart';
import GameDaysChart from './Components/GameDaysChart';
import Footer from './Components/Footer';
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
				<Footer>
					<Title>GetTam Analytics</Title>
				</Footer>

				<GridContainer>
					<UsageChart />
					<LeaderboardChart />
					<PlayersChart />
					<GameDaysChart />
				</GridContainer>
			</>
		);
	}
}

export default App;
