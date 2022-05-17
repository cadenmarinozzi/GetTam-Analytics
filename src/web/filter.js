import axios from 'axios';
import badwords from './badwords';

function contentFilter(text) {
	for (const badword of badwords) {
		if (text.toLowerCase().includes(badword)) {
			return true;
		}
	}
}

export default contentFilter;
