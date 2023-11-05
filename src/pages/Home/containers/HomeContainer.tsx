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
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/cookies/cookie';

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
				if (file.type === ('video/mp4' || 'video/webm' || 'video/ogg')) {
					setSelectedMain(file);
				} else {
					alert('올바른 동영상 파일을 선텍하세요.');
				}
			}
		},
		[selectedMain],
	);
	const uploadOrcaHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (file) {
				if (
					file.type ===
					('application/png' || 'application/jpeg' || 'application/svg')
				) {
					setSelectedOrca(file);
				} else {
					alert('올바른 이미지 파일을 선텍하세요.');
				}
			}
		},
		[selectedOrca],
	);
	const onChangeProjects = useCallback(
		(e: EChange, index: number) => {
			const updatedList = [...selectedProjects];
			updatedList[index] = e.target.value;
			setSelectedProjects(updatedList);
		},
		[selectedProjects],
	);
	const onChangeInsights = useCallback(
		(e: EChange, index: number) => {
			const updatedList = [...selectedInsights];
			updatedList[index] = e.target.value;
			setSelectedInsights(updatedList);
			console.log(selectedInsights);
		},
		[selectedInsights],
	);

	const onMainBannerSubmit = useCallback(async () => {
		await putMainBanner(selectedMain, selectedOrca);
		alert('적용되었습니다');
	}, [selectedMain]);
	const onOrcaBannerSubmit = useCallback(async () => {
		await putOrcaBanner(selectedMain, selectedOrca);
		alert('적용되었습니다');
	}, [selectedOrca]);
	const onProjectSubmit = useCallback(async () => {
		await putMainProjects(selectedProjects);
		alert('적용되었습니다');
	}, [selectedProjects]);
	const onInsightSubmit = useCallback(async () => {
		await putMainInsights(selectedInsights);
		alert('적용되었습니다');
	}, [selectedInsights]);
	const navigate = useNavigate();
	useEffect(() => {
		let check = getCookie('login');
		console.log(typeof check, 'sfsdfsffasgagf');
		if (typeof check == 'undefined') {
			//alert('로그인이 필요한 화면입니다');
			navigate('/');
		}
	}, []);
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
		getMainBanner().then((data) => {});
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
