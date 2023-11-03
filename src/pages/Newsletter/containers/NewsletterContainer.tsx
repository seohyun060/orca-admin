import React, { useCallback, useEffect, useState } from 'react';
import Newsletter from '../Newsletter';
import { Newsletters } from '@typedef/types';
import { getNewsletters, deleteNewsletter } from 'src/api/NewsletterAPI';
import * as XLSX from 'xlsx';
import { setMaxListeners } from 'events';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/cookies/cookie';
type Props = {};

const NewsletterContainer = (props: Props) => {
	const [newsletterList, setNewsletterList] = useState<Newsletters[]>([]);
	const downloadExcel = useCallback((data: Newsletters[]) => {
		// 데이터를 이차원 배열로 변환
		const dataArray = [
			['Index', 'ID', 'Email'], // 라벨 배열
			...data.map((newsletter, index) => [
				index + 1,
				newsletter.id,
				newsletter.email,
			]),
		];
		// 워크북 생성
		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.aoa_to_sheet(dataArray);
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
		// 워크북에 워크시트 추가
		XLSX.utils.book_append_sheet(wb, ws, 'Newsletter');

		// 엑셀 파일 생성 및 다운로드
		//XLSX.writeFile(wb, `newsletter_${date}.xlsx`);
		XLSX.writeFile(wb, `newsletter_${formatDate(date)}.xlsx`);
	}, []);

	const onTrashClick = useCallback(
		(id: number) => {
			const confirmed = window.confirm('삭제하시겠습니까?');
			if (confirmed) {
				setNewsletterList((prevList: Newsletters[]) => {
					const updatedList = prevList.filter(
						(newsletter) => newsletter.id !== id,
					);
					return updatedList;
				});
				deleteNewsletter(id);
				alert('삭제되었습니다');
			}
		},
		[newsletterList],
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
		getNewsletters().then((data) => {
			console.log(data.data); // 나옴
			const updatedList = data.data;
			setNewsletterList(updatedList);
		});

		return () => {};
	}, []);

	return (
		<Newsletter
			newsletterList={newsletterList}
			onTrashClick={onTrashClick}
			downloadExcel={downloadExcel}
		/>
	);
};

export default NewsletterContainer;
