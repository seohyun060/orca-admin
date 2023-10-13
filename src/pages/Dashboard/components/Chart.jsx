import { error } from 'console';
import { gapi } from 'gapi-script';
import { GApiProvider } from 'react-gapi-auth2';
import { useEffect, useState } from 'react';
const Chart = () => {
	var VIEW_ID = '6275024029';
	var CLIENT_ID =
		'342186072976-ea0uvmocruc0pgrpn591r0ibhr8s0en8.apps.googleusercontent.com';
	const PROPERTY_ID = '411326234';
	var SCOPES =
		'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly';
	// const DISCOVERY_DOCS = [
	// 	'https://www.googleapis.com/discovery/v1/apis/analytics/v3/rest',
	// ];
	const DISCOVERY_DOCS = [
		'https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta',
	];

	const [data, setData] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		gapi.load('client:auth2', initGapi);

		return () => {};
	}, []);
	const clientConfig = {
		apiKey: 'AIzaSyCSO-S1bl4nZzn62EWbpdkfLdte8u2lsbU',
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES,
		cookie_policy: 'single_host_origin',
		// etc...
	};
	const initGapi = () => {
		gapi.client
			.init({
				apiKey: 'AIzaSyCSO-S1bl4nZzn62EWbpdkfLdte8u2lsbU',
				discoveryDocs: DISCOVERY_DOCS,
				clientId: CLIENT_ID,
				scope: SCOPES,
				cookie_policy: 'single_host_origin',
			})
			.then(() => {
				setLoggedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
				gapi.client.analyticsdata = gapi.client.analyticsdata || {};
				console.log('Google API 초기화 완료');
			})
			.catch((error) => {
				console.error('초기화 실패', error);
			});
	};

	const handleLogin = () => {
		gapi.load('client:auth2', () => {
			gapi.auth2
				.getAuthInstance()
				.signIn()
				.then(() => {
					setLoggedIn(true);
				})
				.catch((error) => {
					console.error('인증 실패', error);
				});
		});
	};

	const handleLogout = () => {
		gapi.auth2
			.getAuthInstance()
			.signOut()
			.then(() => {
				setLoggedIn(false);
				setData([]);
			})
			.catch((error) => {
				console.error('로그아웃 실패', error);
			});
	};
	const handleFetchData = () => {
		if (!gapi.client.analyticsdata) {
			console.error('gapi.client.analyticsdata is not available.');
			return;
		}
		gapi.client.analyticsdata.properties
			.batchRunReports({
				property: `properties/${PROPERTY_ID}`,
				resource: {
					requests: [
						{
							dimensions: [
								{
									name: 'date',
								},
							],
							metrics: [
								{
									name: 'activeUsers',
								},
								{
									name: 'sessions',
								},
							],
							dateRanges: [
								{
									startDate: '7daysAgo',
									endDate: 'yesterday',
								},
							],
						},
					],
				},
			})
			.then((response) => {
				const { rows } = response.result.reports[0];
				const transformedData = rows.map((row) => ({
					date: row.dimensionValues[0].value,
					activeUsers: parseInt(row.metricValues[0].value, 10),
					sessions: parseInt(row.metricValues[1].value, 10),
				}));
				console.log(transformedData);
				setData(transformedData);
			})
			.catch((error) => {
				console.error('데이터 쿼리 중 오류', error);
			});
	};

	return (
		<div>
			<GApiProvider clientConfig={clientConfig}>
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
			</GApiProvider>
		</div>
	);
};

export default Chart;
