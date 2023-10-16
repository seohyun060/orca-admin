import { error } from 'console';
// import { gapi, loadAuth2, loadGapiInsideDOM } from 'gapi-script';
import { GApiProvider } from 'react-gapi-auth2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useScript from '@hooks/useScript';

const Chart = () => {
	const API_KEY = 'AIzaSyCSO-S1bl4nZzn62EWbpdkfLdte8u2lsbU';
	var VIEW_ID = '6275024029';
	const CLIENT_ID =
		'342186072976-ea0uvmocruc0pgrpn591r0ibhr8s0en8.apps.googleusercontent.com';
	const PROPERTY_ID = '411326234';
	const SCOPES =
		'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly';
	// const DISCOVERY_DOCS = [
	// 	'https://www.googleapis.com/discovery/v1/apis/analytics/v3/rest',
	// ];
	const DISCOVERY_DOCS = [
		'https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta',
	];

	const [loading, error] = useScript('https://accounts.google.com/gsi/client');

	const [data, setData] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	const [analyticsData, setAnalyticsData] = useState(null);
	// useEffect(() => {
	// 	gapi.load('client:auth2', initGapi);

	// 	return () => {};
	// }, []);

	const fetchDataFromAnalytics = async () => {
		const startDate = '2023-09-01';
		const endDate = '2023-09-30';
		const apiUrl = `https://analyticsdata.googleapis.com/v1alpha:runReport`;

		const requestBody = {
			property: `properties/-/googleAnalyticsData`,
			resource: {
				dateRanges: [
					{
						startDate,
						endDate,
					},
				],
				dimensions: [{ name: 'date' }],
				metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
				dimensionFilter: {
					filter: {
						fieldName: 'date',
						stringFilter: { matchType: 'EXACT', value: '2023-09-10' }, // Sample date
					},
				},
				keepEmptyRows: true,
			},
		};

		try {
			const response = await axios.post(apiUrl, requestBody, {
				headers: {
					Authorization: `Bearer ${API_KEY}`,
					'Content-Type': 'application/json',
				},
			});

			return response.data;
		} catch (error) {
			console.error('Error fetching data from Analytics API:', error);
			throw error;
		}
	};
	// useEffect(() => {
	// 	const fetchAnalyticsData = async () => {
	// 		try {
	// 			const data = await fetchDataFromAnalytics();
	// 			setAnalyticsData(data);
	// 		} catch (error) {
	// 			console.error('Error fetching analytics data:', error);
	// 		}
	// 	};

	// 	fetchAnalyticsData();
	// }, []);

	// const clientConfig = {
	// 	apiKey: 'AIzaSyCSO-S1bl4nZzn62EWbpdkfLdte8u2lsbU',
	// 	discoveryDocs: DISCOVERY_DOCS,
	// 	clientId: CLIENT_ID,
	// 	scope: SCOPES,
	// 	cookie_policy: 'single_host_origin',
	// 	// etc...
	// };
	// const initGapi = () => {
	// 	gapi.client
	// 		.init({
	// 			// apiKey: 'AIzaSyCSO-S1bl4nZzn62EWbpdkfLdte8u2lsbU',
	// 			discoveryDocs: DISCOVERY_DOCS,
	// 			clientId: CLIENT_ID,
	// 			scope: SCOPES,
	// 			// cookie_policy: 'single_host_origin',
	// 		})
	// 		.then(() => {
	// 			setLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
	// 			// gapi.client.analyticsdata = gapi.client.analyticsdata || {};
	// 			console.log('Google API 초기화 완료');
	// 		})
	// 		.catch((error) => {
	// 			console.error('초기화 실패', error);
	// 		});
	// };

	const handleLogin = () => {
		// initGapi();
		// gapi.load('client:auth2', () => {
		// 	gapi.auth2
		// 		.getAuthInstance()
		// 		.signIn()
		// 		.then(() => {
		// 			setLoggedIn(true);
		// 		})
		// 		.catch((error) => {
		// 			console.error('인증 실패', error);
		// 		});
		// });
	};

	const handleLogout = () => {
		// gapi.auth2
		// 	.getAuthInstance()
		// 	.signOut()
		// 	.then(() => {
		// 		setLoggedIn(false);
		// 		setData([]);
		// 	})
		// 	.catch((error) => {
		// 		console.error('로그아웃 실패', error);
		// 	});
	};
	const handleFetchData = () => {
		// if (!gapi.client.analyticsdata) {
		// 	console.error('gapi.client.analyticsdata is not available.');
		// 	return;
		// }
		// gapi.client.analyticsdata.properties
		// 	.batchRunReports({
		// 		property: `properties/${PROPERTY_ID}`,
		// 		resource: {
		// 			requests: [
		// 				{
		// 					dimensions: [
		// 						{
		// 							name: 'date',
		// 						},
		// 					],
		// 					metrics: [
		// 						{
		// 							name: 'activeUsers',
		// 						},
		// 						{
		// 							name: 'sessions',
		// 						},
		// 					],
		// 					dateRanges: [
		// 						{
		// 							startDate: '7daysAgo',
		// 							endDate: 'yesterday',
		// 						},
		// 					],
		// 				},
		// 			],
		// 		},
		// 	})
		// 	.then((response) => {
		// 		const { rows } = response.result.reports[0];
		// 		const transformedData = rows.map((row) => ({
		// 			date: row.dimensionValues[0].value,
		// 			activeUsers: parseInt(row.metricValues[0].value, 10),
		// 			sessions: parseInt(row.metricValues[1].value, 10),
		// 		}));
		// 		console.log(transformedData);
		// 		setData(transformedData);
		// 	})
		// 	.catch((error) => {
		// 		console.error('데이터 쿼리 중 오류', error);
		// 	});
	};

	useEffect(() => {
		if (loading) {
			function displayResults(response) {
				var formattedJson = JSON.stringify(response.result, null, 2);
				document.getElementById('query-output').value = formattedJson;
			}
			(async () => {
				const handleCallback = () => console.log('a');
				const account = await window.google.accounts.id.initialize({
					client_id: CLIENT_ID,
					callback: handleCallback,
				});

				// const prompt = await window.google.accounts.id.prompt();

				console.log(account);
				// const gapi = window.gapi.client
				// 	.request({
				// 		path: '/v4/reports:batchGet',
				// 		root: 'https://analyticsreporting.googleapis.com/',
				// 		method: 'POST',
				// 		body: {
				// 			reportRequests: [
				// 				{
				// 					viewId: VIEW_ID,
				// 					dateRanges: [
				// 						{
				// 							startDate: '7daysAgo',
				// 							endDate: 'today',
				// 						},
				// 					],
				// 					metrics: [
				// 						{
				// 							expression: 'ga:sessions',
				// 						},
				// 					],
				// 				},
				// 			],
				// 		},
				// 	})
				// 	.then(displayResults, console.error.bind(console));
			})();
		}
	}, []);

	return (
		<div>
			{/* {analyticsData && <pre>{JSON.stringify(analyticsData, null, 2)}</pre>} */}
			{/* <GApiProvider clientConfig={clientConfig}> */}
			<button
				onClick={() => {
					handleLogin();
				}}
			>
				login
			</button>
			<button
				onClick={() => {
					handleFetchData();
				}}
			>
				fetch
			</button>
			{/* </GApiProvider> */}
		</div>
	);
};

export default Chart;
