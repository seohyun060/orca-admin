export async function getOrcaMembers() {
	return fetch('https://api-orca.beamworks.co.kr/api/orcaMembers', {
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
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
