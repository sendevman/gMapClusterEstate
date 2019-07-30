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

export function getCoordinateProperty(token, url) {
	return fetch(`${API}/properties/tools/coordinates${url}`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token,
		},
	})
		.then(res => res.json())
		.catch(error => error);
}