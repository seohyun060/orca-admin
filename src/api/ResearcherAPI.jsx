import { getCookie } from 'src/cookies/cookie';

export async function getResearchers() {
	return fetch('https://api-orca.beamworks.co.kr/api/researchers', {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			return data;
		});
}
export async function deleteResearcher(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/researchers/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
	})
		.then((res) => res.json())

		.then((data) => {
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
	}
	console.log(data);

	return fetch(`https://api-orca.beamworks.co.kr/api/researchers/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'PUT',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}

export async function getResearcherDetail(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/researchers/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
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

	return fetch(`https://api-orca.beamworks.co.kr/api/researchers/`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'POST',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}
export async function storeResearcher(id, isStored) {
	return fetch(
		`https://api-orca.beamworks.co.kr/api/researchers/${id}?store=${isStored}`,
		{
			headers: {
				Authorization: `Bearer ${getCookie('login')}`,
			},
			method: 'PUT',
		},
	)
		.then((res) => res.json())

		.then((data) => {
			//data = researcher;
			return data;
		});
}
