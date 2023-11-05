import { getCookie } from 'src/cookies/cookie';

export async function getInsights() {
	return fetch('https://api-orca.beamworks.co.kr/api/insights', {
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
export async function getMainInsights() {
	return fetch('https://api-orca.beamworks.co.kr/api/insights?select=true', {
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
export async function putMainInsights(urls) {
	let data = new FormData();
	console.log(urls);
	data.append('urls', urls);
	return fetch(`https://api-orca.beamworks.co.kr/api/insights`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'PUT',
		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())
		.then((data) => {});
}
export async function getInsightDetail(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/insights/${id}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
	})
		.then((res) => res.json())

		.then((data) => {
			//data = researcher;
			return data;
		});
}
export async function storeInsight(id, isStored) {
	return fetch(
		`https://api-orca.beamworks.co.kr/api/insights/${id}?store=${isStored}`,
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
export async function putInsights(id, insight) {
	let data = new FormData();
	console.log(insight.files);
	data.append('title', insight.title);
	data.append('category', insight.category);
	for (let i = 0; i < insight.files.length; i++) {
		console.log(insight.files[i]);
		data.append('files', insight.files[i]);
	}

	console.log(data);

	return fetch(`https://api-orca.beamworks.co.kr/api/insights/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'PUT',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}
export async function postInsights(insight) {
	let data = new FormData();

	data.append('title', insight.title);
	data.append('category', insight.category);
	for (let i = 0; i < insight.files.length; i++) {
		data.append('files', insight.files[i]);
	}

	console.log(data);

	return fetch(`https://api-orca.beamworks.co.kr/api/insights/`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'POST',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}

export async function deleteInsight(id) {
	return fetch(`https://api-orca.beamworks.co.kr/api/insights/${id}`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			return data;
		});
}
