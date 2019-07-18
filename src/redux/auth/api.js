import { API } from '../config';

export const authLogin = (auth) => {
	return fetch(`${API}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(auth),
	})
		.then((res) => res.json())
		.then((res) => res.token);
}

export const authSignup = (auth) => {
	return fetch(`${API}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(auth),
	})
		.then((res) => res.json())
		.then((res) => res.token);
}
