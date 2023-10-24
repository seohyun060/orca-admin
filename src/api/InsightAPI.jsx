export async function getInsights() {
	return fetch('http://43.202.46.227/api/insights', {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}

export async function getInsightDetail(id) {
	return fetch(`http://43.202.46.227/api/insights/${id}`, {
		method: 'GET',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);
			//data = researcher;
			return data;
		});
}
export async function storeInsight(id, isStored) {
	return fetch(`http://43.202.46.227/api/insights/${id}?store=${isStored}`, {
		method: 'PUT',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);
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

	return fetch(`http://43.202.46.227/api/insights/${id}`, {
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
		console.log(insight.files[i]);
		data.append('files', insight.files[i]);
	}

	console.log(data);

	return fetch(`http://43.202.46.227/api/insights/`, {
		method: 'POST',

		body: data, // 데이터를 JSON 문자열로 변환하여 본문에 추가
	})
		.then((res) => res.json())

		.then((data) => {});
}

export async function deleteInsight(id) {
	return fetch(`http://43.202.46.227/api/insights/${id}`, {
		method: 'DELETE',
	})
		.then((res) => res.json())

		.then((data) => {
			console.log(data);

			return data;
		});
}
