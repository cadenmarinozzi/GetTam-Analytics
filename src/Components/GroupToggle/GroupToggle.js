import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import './GroupToggle.scss';

class GroupToggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refs: []
		};
	}

	handleClick(ref, toggle) {
		this.state.refs.forEach(otherRef => {
			otherRef.current.className =
				otherRef === ref ? 'button-active' : 'button-inactive';
		});

		if (toggle.onClick) {
			toggle.onClick();
		}
	}

	componentDidMount() {
		this.props.toggles.forEach(toggle => {
			if (toggle.default && toggle.onClick) {
				toggle.onClick();
			}
		});
	}

	render() {
		this.state.refs = [];

		const buttons = this.props.toggles.map((toggle, index) => {
			const ref = createRef();
			this.state.refs.push(ref);

			return (
				<button
					ref={ref}
					onClick={this.handleClick.bind(this, ref, toggle)}
					key={index}
					className={
						toggle.default ? 'button-active' : 'button-inactive'
					}
				>
					{toggle.label}
				</button>
			);
		});

		return <div>{buttons}</div>;
	}
}

GroupToggle.propTypes = {
	toggles: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			onClick: PropTypes.func,
			default: PropTypes.bool
		})
	).isRequired
};

export default GroupToggle;
