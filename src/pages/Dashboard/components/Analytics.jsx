import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';
//import '../components/AnalyticsScript'; // Load the script

const Analytics = () => {
	var VIEW_ID = '6275024029';
	var CLIENT_ID =
		'342186072976-ea0uvmocruc0pgrpn591r0ibhr8s0en8.apps.googleusercontent.com';
	var SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
	const DISCOVERY_DOCS = [
		'https://www.googleapis.com/discovery/v1/apis/analytics/v3/rest',
	];

	function authorize(event) {
		// Handles the authorization flow.
		// `immediate` should be false when invoked from the button click.
		// var useImmdiate = event ? false : true;
		var authData = {
			client_id: CLIENT_ID,
			scope: SCOPES,
			// immediate: useImmdiate,
			immediate: false,
			apiKey: 'AIzaSyAzzskOnh6nNx5hrfsvFw655yRpMM4umrk', // Replace with your API key
			discoveryDocs: DISCOVERY_DOCS,
		};

		gapi.auth.authorize(authData, function (response) {
			var authButton = document.getElementById('auth-button');
			if (response.error) {
				authButton.hidden = false;
			} else {
				authButton.hidden = true;
				queryAccounts();
			}
		});
	}
	function queryAccounts() {
		// Load the Google Analytics client library.
		gapi.client.load('analytics', 'v3').then(function () {
			// Get a list of all Google Analytics accounts for this user
			gapi.client.analytics.management.accounts.list().then(handleAccounts);
		});
	}

	function handleAccounts(response) {
		// Handles the response from the accounts list method.
		if (response.result.items && response.result.items.length) {
			// Get the first Google Analytics account.
			var firstAccountId = response.result.items[0].id;

			// Query for properties.
			queryProperties(firstAccountId);
		} else {
			console.log('No accounts found for this user.');
		}
	}

	function queryProperties(accountId) {
		// Get a list of all the properties for the account.
		gapi.client.analytics.management.webproperties
			.list({ accountId: accountId })
			.then(handleProperties)
			.then(null, function (err) {
				// Log any errors.
				console.log(err);
			});
	}

	function handleProperties(response) {
		// Handles the response from the webproperties list method.
		if (response.result.items && response.result.items.length) {
			// Get the first Google Analytics account
			var firstAccountId = response.result.items[0].accountId;

			// Get the first property ID
			var firstPropertyId = response.result.items[0].id;

			// Query for Views (Profiles).
			queryProfiles(firstAccountId, firstPropertyId);
		} else {
			console.log('No properties found for this user.');
		}
	}

	function queryProfiles(accountId, propertyId) {
		// Get a list of all Views (Profiles) for the first property
		// of the first Account.
		gapi.client.analytics.management.profiles
			.list({
				accountId: accountId,
				webPropertyId: propertyId,
			})
			.then(handleProfiles)
			.then(null, function (err) {
				// Log any errors.
				console.log(err);
			});
	}

	function handleProfiles(response) {
		// Handles the response from the profiles list method.
		if (response.result.items && response.result.items.length) {
			// Get the first View (Profile) ID.
			var firstProfileId = response.result.items[0].id;

			// Query the Core Reporting API.
			queryCoreReportingApi(firstProfileId);
		} else {
			console.log('No views (profiles) found for this user.');
		}
	}

	function queryCoreReportingApi(profileId) {
		// Query the Core Reporting API for the number sessions for
		// the past seven days.
		gapi.client.analytics.data.ga
			.get({
				ids: 'ga:' + profileId,
				'start-date': '7daysAgo',
				'end-date': 'today',
				metrics: 'ga:sessions',
			})
			.then(function (response) {
				var formattedJson = JSON.stringify(response.result, null, 2);
				document.getElementById('query-output').value = formattedJson;
			})
			.then(null, function (err) {
				// Log any errors.
				console.log(err);
			});
	}

	function queryReports() {
		gapi.client
			.request({
				path: '/v4/reports:batchGet',
				root: 'https://analyticsreporting.googleapis.com/',
				method: 'POST',
				body: {
					reportRequests: [
						{
							viewId: VIEW_ID,
							dateRanges: [
								{
									startDate: '7daysAgo',
									endDate: 'today',
								},
							],
							metrics: [
								{
									expression: 'ga:sessions',
								},
							],
						},
					],
				},
			})
			.then(displayResults, console.error.bind(console));
	}
	//document.getElementById('auth-button').addEventListener('click', authorize);
	function displayResults(response) {
		var formattedJson = JSON.stringify(response.result, null, 2);
		document.getElementById('query-output').value = formattedJson;
	}

	useEffect(() => {
		//queryReports();
		// const handleClientLoad = () => {
		// 	gapi.load('client:auth2', {
		// 		callback: () => {
		// 			gapi.client
		// 				.init({
		// 					apiKey: 'AIzaSyAzzskOnh6nNx5hrfsvFw655yRpMM4umrk', // Replace with your API key
		// 					discoveryDocs: DISCOVERY_DOCS,
		// 					clientId: CLIENT_ID,
		// 					scope: SCOPES.join(' '),
		// 				})
		// 				.then(() => {
		// 					// Now you can use gapi.client and make API calls
		// 					// Query the API
		// 					queryReports();
		// 				});
		// 		},
		// 		onerror: () => {
		// 			// Handle errors
		// 		},
		// 		timeout: 10000, // 10 seconds
		// 		ontimeout: () => {
		// 			// Handle timeouts
		// 		},
		// 	});
		// };
		// // Load the Google API client library
		// const script = document.createElement('script');
		// script.src = 'https://apis.google.com/js/api.js';
		// script.onload = handleClientLoad;
		// document.body.appendChild(script);
		// // Clean up on component unmount
		// return () => {
		// 	document.body.removeChild(script);
		// };
	}, []);

	return (
		<div>
			{/* <button id='auth-button' hidden>
				Authorize
			</button> */}
			<button
				id='auth-button'
				onClick={() => {
					authorize();
				}}
			>
				Authorize
			</button>
			<h1>Hello Analytics Reporting API V4</h1>
			<p className='g-signin2' data-onsuccess='queryReports'></p>
			<textarea cols='80' rows='20' id='query-output'></textarea>
		</div>
	);
};

export default Analytics;
