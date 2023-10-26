export async function getGraph(range) {
	return fetch(
		`https://api-orca.beamworks.co.kr/api/admins/analytics/graph?range=${range}`,
		{
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
		`http://43.202.46.227/api/admins/analytics/table?range=${range}`,
		{
			method: 'GET',
		},
	)
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function getStatistic() {
	return fetch(`http://43.202.46.227/api/admins/analytics/statistic`, {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
