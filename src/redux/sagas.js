import authSagas from './auth/sagas';
import listingSagas from './listing/sagas';
import propertiesSagas from './properties/sagas';

export default function* rootSaga() {
	yield [
		...authSagas,
		...listingSagas,
		...propertiesSagas,
	];
}
