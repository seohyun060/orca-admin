import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { getMainProjects, putMainProjects } from 'src/api/projectsAPI';
import { getMainInsights, putMainInsights } from 'src/api/InsightAPI';
import {
	getOrcaBanner,
	getMainBanner,
	putOrcaBanner,
	putMainBanner,
} from 'src/api/BannerAPI';
import Home from '../Home';
import { EChange } from '@typedef/types';

type Props = {};

const HomeContainer = (props: Props) => {
	const [selectedMain, setSelectedMain] = useState<File | null>(null);
	const [selectedOrca, setSelectedOrca] = useState<File | null>(null);
	const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
	const [selectedInsights, setSelectedInsights] = useState<string[]>([]);
	const uploadMainHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				setSelectedMain(file);
			}
		},
		[selectedMain],
	);

	const uploadOrcaHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				setSelectedOrca(file);
			}
		},
		[selectedOrca],
	);
	const onChangeProjects = useCallback(
		(e: EChange, index: number) => {
			const updatedList = [...selectedProjects];
			updatedList[index] = e.target.value;
			setSelectedProjects(updatedList);
			console.log(selectedProjects);
		},
		[selectedProjects],
	);
	const onProjectSubmit = useCallback(() => {
		putMainProjects(selectedProjects);
	}, [selectedProjects]);
	const onChangeInsights = useCallback(
		(e: EChange, index: number) => {
			const updatedList = [...selectedInsights];
			updatedList[index] = e.target.value;
			setSelectedInsights(updatedList);
			console.log(selectedInsights);
		},
		[selectedInsights],
	);
	const onOrcaBannerSubmit = useCallback(() => {
		putOrcaBanner(selectedMain, selectedOrca);
	}, [selectedOrca]);
	const onMainBannerSubmit = useCallback(() => {
		putMainBanner(selectedMain, selectedOrca);
	}, [selectedMain]);
	const onInsightSubmit = useCallback(() => {
		putMainInsights(selectedInsights);
	}, [selectedInsights]);
	useEffect(() => {
		getMainProjects().then((data) => {
			const updatedList: string[] = [];
			data.data.map((d: any) => {
				updatedList.push(`http://orca.beamworks.co.kr/projects/${d.id}`);
			});
			setSelectedProjects(updatedList);
		});
		getMainInsights().then((data) => {
			const updatedList: string[] = [];
			data.data.map((d: any) => {
				updatedList.push(`http://orca.beamworks.co.kr/insights/${d.id}`);
			});
			setSelectedInsights(updatedList);
		});
		getOrcaBanner().then((data) => {});
		getMainBanner().then((data) => {
			// console.log(data.data); // 나옴
		});
		return () => {};
	}, []);

	return (
		<Home
			selectedMain={selectedMain}
			selectedOrca={selectedOrca}
			uploadMainHandler={uploadMainHandler}
			uploadOrcaHandler={uploadOrcaHandler}
			selectedProjects={selectedProjects}
			onChangeProjects={onChangeProjects}
			onProjectSubmit={onProjectSubmit}
			selectedInsights={selectedInsights}
			onChangeInsights={onChangeInsights}
			onInsightSubmit={onInsightSubmit}
			onOrcaBannerSubmit={onOrcaBannerSubmit}
			onMainBannerSubmit={onMainBannerSubmit}
		/>
	);
};

export default HomeContainer;
