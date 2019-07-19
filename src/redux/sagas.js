import authSagas from './auth/sagas';
import listingSagas from './listing/sagas';

export default function* rootSaga() {
	yield [
		...authSagas,
		...listingSagas,
	];
}
