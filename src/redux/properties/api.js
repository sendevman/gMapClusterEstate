import { API } from '../config';

export function getProperty(token, id) {
	return fetch(`${API}/properties/${id}`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	})
		.then(res => res.json())
		.catch(error => error);
}
