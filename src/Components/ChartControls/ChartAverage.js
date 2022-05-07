import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Toggle from '../Toggle';

class ChartAverage extends Component {
	constructor(props) {
		super(props);
		this.lineGraphRef = createRef();
		this.barGraphRef = createRef();
		this.state = {
			refs: [this.lineGraphRef, this.barGraphRef]
		};
	}

	handleClick(enabled) {
		const annotation =
			this.props.chartState.chart?.config.options.plugins.annotation
				.annotations[0];
		if (!annotation) return;

		annotation.borderWidth = enabled ? 2 : 0;
		annotation.label.enabled = enabled;
		this.props.chartState.chart.update();
	}

	render() {
		return (
			<Toggle
				label="Show Average"
				enabled
				onClick={this.handleClick.bind(this)}
			/>
		);
	}
}

ChartAverage.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object
	}).isRequired
};

export default ChartAverage;
