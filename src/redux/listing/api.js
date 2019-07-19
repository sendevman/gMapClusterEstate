import { API } from '../config';

export function getList(param) {
	return fetch(`${API}/${param.type}`, {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			Authorization: param.token,
		},
	})
		.then(res => res.json())
		.catch(error => error);
}
