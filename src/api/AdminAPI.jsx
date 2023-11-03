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

export async function postLogin(id, pw) {
	let data = new FormData();
	data.append('username', id);
	data.append('password', pw);
	return await fetch(`https://api-orca.beamworks.co.kr/api/admins/login`, {
		method: 'POST',
		body: data,
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			return data;
		});
	// .then((res) => {
	// 	let data = res.headers;
	// 	let auth = data.get('Authorization');
	// 	console.log(data, auth);
	// 	return data;
	// });
	// .then((res) => {
	// 	let data = res.headers;
	// 	for (let [key, value] of data) {
	// 		console.log(`${key} = ${value}`);
	// 	}
	// });
}
