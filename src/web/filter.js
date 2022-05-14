import axios from 'axios';
import badwords from './badwords';

function contentFilter(text) {
	for (const badword of badwords) {
		const bad = text.toLowerCase().includes(badword);

		if (bad) return true;
	}
}

export default contentFilter;
