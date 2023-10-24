export async function getResearchers() {
	return fetch('http://43.202.46.227/api/researchers', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
export async function deleteResearcher(id) {
	return fetch(`http://43.202.46.227/api/researchers/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function putResearchers(id, researcher, image) {
	let data = new FormData();

	let info = {
		locationNumber: researcher.locationNumber,
		name: researcher.name,
		affiliation: researcher.affiliation,
		projectType: researcher.projectType,
		linkedIn: researcher.linkedIn,
		twitter: researcher.twitter,
		biography: researcher.biography,
		publications: researcher.publications,
	};
	const infoJson = JSON.stringify(info);

	data.append('info', new Blob([infoJson], { type: 'application/json' }));
	if (image) {
		data.append('image', image);
		console.log('이미지 변경함');
	}
	console.log(data);

	return fetch(`http://43.202.46.227/api/researchers/${id}`, {
		method: 'PUT',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}

export async function getResearcherDetail(id) {
	return fetch(`http://43.202.46.227/api/researchers/${id}`, {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);
			//data = researcher;
			return data;
		});
}

export async function postResearchers(researcher, image) {
	let data = new FormData();

	let info = {
		locationNumber: researcher.locationNumber,
		name: researcher.name,
		affiliation: researcher.affiliation,
		projectType: researcher.projectType,
		linkedIn: researcher.linkedIn,
		twitter: researcher.twitter,
		biography: researcher.biography,
		publications: researcher.publications,
	};
	const infoJson = JSON.stringify(info);

	data.append('info', new Blob([infoJson], { type: 'application/json' }));
	if (image) {
		data.append('image', image);
	}

	console.log(data);

	return fetch(`http://43.202.46.227/api/researchers/`, {
		method: 'POST',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}
