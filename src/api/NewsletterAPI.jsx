export async function getNewsletters() {
	return fetch('http://43.202.46.227/api/newsletters', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function deleteNewsletter(id) {
	return fetch(`http://43.202.46.227/api/newsletters/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
