import React, { ChangeEvent, useCallback, useState } from 'react';
import Home from '../Home';
type Props = {};

const HomeContainer = (props: Props) => {
	const [selectedMain, setSelectedMain] = useState<File | null>(null);
	const [selectedOrca, setSelectedOrca] = useState<File | null>(null);
	const uploadMainHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				setSelectedMain(file);
			}
		},
		[setSelectedMain],
	);

	const uploadOrcaHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				setSelectedOrca(file);
			}
		},
		[setSelectedOrca],
	);

	return (
		<Home
			selectedMain={selectedMain}
			selectedOrca={selectedOrca}
			uploadMainHandler={uploadMainHandler}
			uploadOrcaHandler={uploadOrcaHandler}
		/>
	);
};

export default HomeContainer;
