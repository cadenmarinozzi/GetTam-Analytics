import './GridContainer.scss';

function GridItem(props) {
	return <div className="grid-item">{props.children}</div>;
}

function GridContainer(props) {
	const grid = props.children.map((item, index) => {
		return <GridItem key={index}>{item}</GridItem>;
	});

	return <section className="grid-container">{grid}</section>;
}

export default GridContainer;
