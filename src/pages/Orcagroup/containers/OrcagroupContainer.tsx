import React, { useCallback, useEffect, useState } from 'react';
import Orcagroup from '../Orcagroup';
import { Newsletters } from '@typedef/types';
import { getOrcaMembers, deleteOrcaMember } from 'src/api/OrcaMemberAPI';

import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/cookies/cookie';

type Props = {};

const OrcagroupContainer = (props: Props) => {
	const [orcagroupList, setOrcagroupList] = useState<Newsletters[]>([]);

	const downloadExcel = (data: Newsletters[]) => {
		// 데이터를 이차원 배열로 변환
		const dataArray = [
			['Index', 'ID', 'Email'], // 라벨 배열
			...data.map((orcagroup, index) => [
				index + 1,
				orcagroup.id,
				orcagroup.email,
			]),
		];
		// 워크북 생성
		const date = new Date();
		function formatDate(date: Date) {
			const year = date.getFullYear().toString(); // 년도의 마지막 두 자리
			let month = (date.getMonth() + 1).toString(); // 월을 문자열로 변환
			if (parseInt(month) < 10) {
				month = `0${month}`;
			}
			let day = date.getDate().toString(); // 일
			if (parseInt(day) < 10) {
				day = `0${day}`;
			}
			return `${year}.${month}.${day}`;
		}
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.aoa_to_sheet(dataArray);

		// 워크북에 워크시트 추가
		XLSX.utils.book_append_sheet(wb, ws, 'Orcagroup');

		// 엑셀 파일 생성 및 다운로드
		XLSX.writeFile(wb, `orcagroup_${formatDate(date)}.xlsx`);
	};
	const onTrashClick = useCallback(
		(id: number) => {
			const confirmed = window.confirm('삭제하시겠습니까?');
			if (confirmed) {
				setOrcagroupList((prevList: Newsletters[]) => {
					const updatedList = prevList.filter(
						(orcagroup) => orcagroup.id !== id,
					);
					return updatedList;
				});
				deleteOrcaMember(id);
				alert('삭제되었습니다.');
			}
		},
		[orcagroupList],
	);
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
		getOrcaMembers().then((data) => {
			const updatedList = data.data;
			setOrcagroupList(updatedList);
		});

		return () => {};
	}, []);

	return (
		<Orcagroup
			orcagroupList={orcagroupList}
			onTrashClick={onTrashClick}
			downloadExcel={downloadExcel}
		/>
	);
};

export default OrcagroupContainer;
