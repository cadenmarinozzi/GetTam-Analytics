import { Component, createRef } from 'react';
import GroupToggle from '../GroupToggle';
import PropTypes from 'prop-types';

class ChartType extends Component {
	constructor(props) {
		super(props);
		this.lineGraphRef = createRef();
		this.barGraphRef = createRef();
		this.state = {
			refs: [this.lineGraphRef, this.barGraphRef]
		};
	}

	render() {
		return (
			<GroupToggle
				toggles={[
					{
						label: 'Line Graph',
						default: true,
						onClick: () => {
							let chartState = this.props.chartState;
							let config = chartState.chart.config;
							let dataset = config.data.datasets[1];

							config.type = 'line';

							if (dataset.borderColor !== 'rgba(0,0,0,0)') {
								dataset.borderColor = 'rgb(0, 0, 0)'; // Show the predicted line
							}

							chartState.chart.update();
						}
					},
					{
						label: 'Bar Graph',
						onClick: () => {
							let chartState = this.props.chartState;
							let config = chartState.chart.config;

							config.type = 'bar';
							config.data.datasets[1].backgroundColor =
								'rgba(0,0,0,0)'; // Hide the predicted line
							chartState.chart.update();
						}
					}
				]}
			/>
		);
	}
}

ChartType.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired
};

export default ChartType;
