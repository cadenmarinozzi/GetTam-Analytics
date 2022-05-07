import './Title.scss';
import { Gradient } from 'react-gradient';

function Title(props) {
	return (
		<Gradient
			gradients={[
				['rgb(255, 99, 132)', '#1f4ba3'],
				['#1f4ba3', 'rgb(255, 99, 132)']
			]}
			property="text"
			angle="30deg"
			element="h1"
			className="title"
		>
			{props.children}
		</Gradient>
	);
}

export default Title;
