import { getCookie } from 'src/cookies/cookie';
export async function getGraph(range) {
	console.log(getCookie('login'));
	return fetch(
		`https://api-orca.beamworks.co.kr/api/admins/analytics/graph?range=${range}`,
		{
			headers: {
				Authorization: `Bearer ${getCookie('login')}`,
			},
			method: 'GET',
		},
	)
		.then((res) => res.json())

		.then((data) => {
			console.log(data);
			return data;
		});
}

export async function getTable(range) {
	return fetch(
		`https://api-orca.beamworks.co.kr/api/admins/analytics/table?range=${range}`,
		{
			headers: {
				Authorization: `Bearer ${getCookie('login')}`,
			},
			method: 'GET',
		},
	)
		.then((res) => res.json())

		.then((data) => {
			return data;
		});
}

export async function getStatistic() {
	return fetch(
		`https://api-orca.beamworks.co.kr/api/admins/analytics/statistic`,
		{
			headers: {
				Authorization: `Bearer ${getCookie('login')}`,
			},
			method: 'GET',
		},
	)
		.then((res) => res.json())

		.then((data) => {
			return data;
		});
}
