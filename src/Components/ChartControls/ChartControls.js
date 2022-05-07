import ChartType from './ChartType';
import ChartAverage from './ChartAverage';
import PropTypes from 'prop-types';
import './ChartControls.scss';

function ChartControls(props) {
	return (
		<div className="controls-div">
			<ChartType chartState={props.chartState} />
			<ChartAverage chartState={props.chartState} />
		</div>
	);
}

ChartControls.propTypes = {
	chartState: PropTypes.shape({
		chart: PropTypes.object.isRequired
	}).isRequired
};

export default ChartControls;
