export async function getOrcaMembers() {
	return fetch('http://43.202.46.227/api/orcaMembers', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function deleteOrcaMember(id) {
	return fetch(`http://43.202.46.227/api/orcaMembers/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
