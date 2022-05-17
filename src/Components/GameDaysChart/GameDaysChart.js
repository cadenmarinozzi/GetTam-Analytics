import { getGameDates } from '../../web/firebase';
import { Component } from 'react';
import { PieChart } from '../Chart';
import PropTypes from 'prop-types';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

class GameDaysChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
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

		let data = [0, 0, 0, 0, 0, 0, 0];

		labels.forEach(date => {
			const dayType = date.date.toDateString();

			weekdays.forEach(weekday => {
				if (dayType.includes(weekday)) {
					data[weekdays.indexOf(weekday)] += date.gamesPlayed;
				}
			});
		});

		this.setState({
			data: data
		});
	}

	render() {
		if (this.state.data.length === 0) return;

		const max = Math.max(...this.state.data);

		return (
			<PieChart
				type="polarArea"
				label="Games Played Per Day"
				theme={this.props.theme}
				labels={[
					// I need to make this a for loop so it's not so ugly
					[
						'Mon',
						`rgba(255, 142, ${
							110 + (255 - (this.state.data[0] / max) * 255)
						}, 0.7)`
					],
					[
						'Tue',
						`rgba(255, 142, ${
							110 + (255 - (this.state.data[1] / max) * 255)
						}, 0.7)`
					],
					[
						'Wed',
						`rgba(255, 142, ${
							110 + (255 - (this.state.data[2] / max) * 255)
						}, 0.7)`
					],
					[
						'Thu',
						`rgba(255, 142, ${
							110 + (255 - (this.state.data[3] / max) * 255)
						}, 0.7)`
					],
					[
						'Fri',
						`rgba(255, 142, ${
							110 + (255 - (this.state.data[4] / max) * 255)
						}, 0.7)`
					],
					[
						'Sat',
						`rgba(100, 142, ${
							255 - (this.state.data[5] / max) * 255
						}, 0.7)`
					],
					[
						'Sun',
						`rgba(100, 142, ${
							255 - (this.state.data[6] / max) * 255
						}, 0.7)`
					]
				]}
				data={this.state.data}
			/>
		);
	}
}

GameDaysChart.propTypes = {
	theme: PropTypes.string
};

export default GameDaysChart;
