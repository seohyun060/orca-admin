import { getCookie } from 'src/cookies/cookie';

export async function getOrcaMembers() {
	return fetch('https://api-orca.beamworks.co.kr/api/orcaMembers', {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function deleteOrcaMember(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/orcaMembers/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
