import { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../Toggle';

class ChartPredicted extends Component {
	handleClick(enabled) {
		let dataset = this.props.chartState.chart?.config.data.datasets[1];
		if (!dataset) return;

		dataset.borderColor = enabled ? 'rgb(0, 0, 0)' : 'rgba(0,0,0,0)';
		this.props.chartState.chart.update();
	}

	render() {
		return (
			<Toggle
				label="Show Predicted"
				enabled={this.props.enabled}
				onClick={this.handleClick.bind(this)}
			/>
		);
	}
}

ChartPredicted.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired,
	enabled: PropTypes.bool
};

export default ChartPredicted;
