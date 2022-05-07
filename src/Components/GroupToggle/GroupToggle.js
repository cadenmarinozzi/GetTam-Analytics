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
				otherRef === ref ? 'button-active' : '';
		});

		toggle.onClick();
	}

	render() {
		const buttons = this.props.toggles.map((toggle, index) => {
			const ref = createRef();
			this.state.refs.push(ref);

			if (toggle.default) {
				toggle.onClick();
			}

			return (
				<button
					ref={ref}
					onClick={this.handleClick.bind(this, ref, toggle)}
					key={index}
					className={toggle.default ? 'button-active' : ''}
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
