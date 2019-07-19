import { API } from '../config';

export function getData(token, url) {
	return fetch(`${API}/${url}`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	})
		.then(res => res.json())
		.catch(error => error);
}
