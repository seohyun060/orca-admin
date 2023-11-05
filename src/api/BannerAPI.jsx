import { getCookie } from 'src/cookies/cookie';

export async function putMainBanner(mainBanner, orcaBanner) {
	let data = new FormData();

	data.append('mainBanner', mainBanner);
	return fetch(`https://api-orca.beamworks.co.kr/api/banners`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'PUT',
		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())
		.then((data) => {});
}

export async function putOrcaBanner(mainBanner, orcaBanner) {
	let data = new FormData();
	// data.append('mainBanner', mainBanner);
	data.append('orcaBanner', orcaBanner);
	return fetch(`https://api-orca.beamworks.co.kr/api/banners`, {
		headers: {
			Authorization: `Bearer ${getCookie('login')}`,
		},
		method: 'PUT',
		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())
		.then((data) => {});
}

export async function getMainBanner() {
	return fetch('https://api-orca.beamworks.co.kr/api/banners?is-main=true', {
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

export async function getOrcaBanner() {
	return fetch('https://api-orca.beamworks.co.kr/api/banners?is-main=false', {
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
