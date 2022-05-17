import UsageChart from './Components/UsageChart';
import Title from './Components/Title';
import GridContainer from './Components/GridContainer';
import LeaderboardChart from './Components/LeaderboardChart';
import PlayersChart from './Components/PlayersChart';
import GameDaysChart from './Components/GameDaysChart';
import { InappropriateUsersChart } from './Components/InappropriateUsersChart';
import InvalidPlayersChart from './Components/InvalidPlayersChart';
import Footer from './Components/Footer';
import { useState } from 'react';

function App() {
	let [theme, setTheme] = useState('light');

	return (
		<>
			<Footer setTheme={setTheme}>
				<Title>GetTam Analytics</Title>
			</Footer>

			<GridContainer>
				<UsageChart theme={theme} />
				<LeaderboardChart theme={theme} />
				<PlayersChart theme={theme} />
				<GameDaysChart theme={theme} />
			</GridContainer>

			<GridContainer>
				<InappropriateUsersChart theme={theme} />
				<InvalidPlayersChart theme={theme} />
			</GridContainer>
		</>
	);
}

export default App;
