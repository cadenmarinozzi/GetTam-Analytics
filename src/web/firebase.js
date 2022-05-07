import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBQp9ljmUgP1ZuxcaGaY3KJHb8h9GGRlS8',
	authDomain: 'get-tam.firebaseapp.com',
	projectId: 'get-tam',
	storageBucket: 'get-tam.appspot.com',
	messagingSenderId: '8679519646',
	appId: '1:8679519646:web:85204f21b7074c3bd1528f',
	measurementId: 'G-ZQYL5YN5TD'
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const databaseRef = ref(database);

async function getDatabaseData() {
	const databaseData = await get(databaseRef);

	return databaseData.exists() && databaseData.val();
}

async function getGameDates() {
	const databaseData = await getDatabaseData();

	return Object.entries(databaseData).filter(([key]) => {
		return key.match(/(\d-(\d)+)|(\1-testing)/g);
	});
}

export { getGameDates };
