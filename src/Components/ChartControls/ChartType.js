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
							this.props.chartState.chart.config.type = 'line';
							this.props.chartState.chart.update();
						}
					},
					{
						label: 'Bar Graph',
						onClick: () => {
							this.props.chartState.chart.config.type = 'bar';
							this.props.chartState.chart.update();
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
