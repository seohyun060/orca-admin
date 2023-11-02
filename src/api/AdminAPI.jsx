export async function getAdmin() {
	return fetch('https://api-orca.beamworks.co.kr/api/admins', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);
			return data;
		});
}
