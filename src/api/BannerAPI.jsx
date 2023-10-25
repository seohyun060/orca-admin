export async function putMainBanner(mainBanner, orcaBanner) {
	let data = new FormData();

	data.append('mainBanner', mainBanner);
	return fetch(`http://43.202.46.227/api/banners`, {
		method: 'PUT',
		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())
		.then((data) => {});
}

export async function putOrcaBanner(mainBanner, orcaBanner) {
	let data = new FormData();
	console.log(orcaBanner);
	// data.append('mainBanner', mainBanner);
	data.append('orcaBanner', orcaBanner);
	return fetch(`http://43.202.46.227/api/banners`, {
		method: 'PUT',
		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())
		.then((data) => {});
}

export async function getMainBanner() {
	return fetch('http://43.202.46.227/api/banners?is-main=true', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function getOrcaBanner() {
	return fetch('http://43.202.46.227/api/banners?is-main=false', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
