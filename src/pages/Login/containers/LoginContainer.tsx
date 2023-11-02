import React, { useCallback, useState } from 'react';
import Login from '../Login';
import { EChange } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
import Example from '../Example';
type Props = {};

const LoginContainer = (props: Props) => {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
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
	const onLoginClicked = useCallback(() => {
		console.log(id, password);
		navigate('/dashboard');
	}, [id, password]);

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
