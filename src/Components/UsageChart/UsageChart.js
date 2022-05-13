import { getGameDates } from '../../web/firebase';
import { Component } from 'react';
import DataChart from '../Chart';

/**
 *
 * @param {string} date - The date to be formatted. Should be in the format M-D-TESTING or M-D
 * @return {Object} An object containing the parsed date
 */
function parseDate(date, value) {
	const parts = date.split('-'); // Split the date into the day, month, and testing flag

	const month = parseInt(parts[0]);
	const day = parseInt(parts[1]);

	const dateData = new Date(2022, month, day); // Create the date object

	return {
		month: month,
		day: day,
		gamesPlayed: value,
		testing: parts[2] === 'testing',
		date: dateData,
		comparativeDate: dateData[Symbol.toPrimitive]('number') // Get the numerical representation of the date
	};
}

class PlayersChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			labels: [],
			data: []
		};
	}

	async componentDidMount() {
		const gamesDates = await getGameDates();
		const labels = Object.values(gamesDates)
			// Map the values to the parsed date
			.map(([key, value]) => parseDate(key, value))
			// Sort the dates from oldest to newest
			.sort((a, b) => a.comparativeDate - b.comparativeDate);

		this.setState({
			labels: labels.map(
				date => date.date.toDateString().replace('2022', '') // ew
			),
			data: labels.map(dateData => dateData.gamesPlayed)
		});
	}

	render() {
		if (this.state.labels.length > 0) {
			return (
				<DataChart
					averageEnabled
					predictedEnabled
					label="Games Played"
					labels={this.state.labels}
					data={this.state.data}
				/>
			);
		}
	}
}

export default PlayersChart;
