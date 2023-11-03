import React, { useCallback, useEffect, useState } from 'react';
import Login from '../Login';
import { EChange } from '@typedef/types';
import { getCookie, setCookie } from 'src/cookies/cookie';
import { useNavigate } from 'react-router-dom';
import { postLogin } from 'src/api/AdminAPI';
import { removeCookie } from 'src/cookies/cookie';
import Example from '../Example';
import { Cookies } from 'react-cookie';
type Props = {};
//window.history.forward();
const LoginContainer = (props: Props) => {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	let accessToken = '';
	//const [accessToken, setAccessToken] = useState('');
	const navigate = useNavigate();
	let check = false;
	const navigateDashboard = useCallback(async () => {
		navigate('/dashboard');
	}, []);

	const onChangeId = useCallback(
		(e: EChange) => {
			setId(e.target.value);
		},
		[id],
	);
	const onChangePassword = useCallback(
		(e: EChange) => {
			setPassword(e.target.value);
		},
		[password],
	);
	const onLoginClicked = useCallback(
		async (e: any) => {
			e.preventDefault();
			console.log(id, password);

			postLogin(id, password)
				.then((data) => {
					console.log(data);
					accessToken = data.accessToken;

					setCookie('login', `${accessToken}`);
				})
				.finally(() => {
					if (!!accessToken) {
						navigateDashboard();
					} else {
						setId('');
						setPassword('');
						alert('아이디와 패스워드를 확인해주세요');
						document.getElementById('id')?.focus();
					}
				});
		},
		[id, password],
	);
	// const onLoginClicked = useCallback(async () => {
	// 	console.log(id, password);

	// 	try {
	// 		const data = await postLogin(id, password);
	// 		const newAccessToken = data.accessToken;
	// 		console.log(typeof newAccessToken);
	// 		console.log(newAccessToken); // 1

	// 		setAccessToken(newAccessToken); // setAccessToken 함수를 사용하여 업데이트
	// 		setCookie('login', `${newAccessToken}`);

	// 		console.log(newAccessToken); // 2

	// 		await navigateDashboard();
	// 	} catch (error) {
	// 		console.error('Login failed:', error);
	// 	}
	// }, [id, password]);

	useEffect(() => {
		let check = getCookie('login');
		if (typeof check != 'undefined') {
			navigate(-1);
		} else {
			removeCookie('login');
		}

		return () => {};
	}, []);

	return (
		<>
			<Login
				id={id}
				password={password}
				onChangeId={onChangeId}
				onChangePassword={onChangePassword}
				onLoginClicked={onLoginClicked}
			/>
		</>
	);
};

export default LoginContainer;
