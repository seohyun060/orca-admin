import React, { ChangeEvent, useCallback, useState } from 'react';
import InsightInfo from '../InsightInfo';
import { Insights } from '@typedef/types';
import { useLocation, useNavigate } from 'react-router-dom';
type Props = { insightList: Insights[]; setInsightList: any };

const InsightInfoContainer = ({ insightList, setInsightList }: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const edit = location.state.Edit;
	const id = location.state.Id;

	const [dropbox, setDropbox] = useState(false);
	const [selectedType, setSelectedType] = useState(location.state.Type);
	const [titleEdit, setTitleEdit] = useState(location.state.Title);
	const [pdfListEdit, setPdfListEdit] = useState<string[]>(
		location.state.PdfList,
	); // 넘겨받은 pdf url을 관리할 배열 state

	const onDropboxClicked = useCallback(() => {
		setDropbox((prev) => !prev);
	}, [dropbox]);

	const onTypeClicked = useCallback(
		(type: string) => {
			setSelectedType(type);
			setDropbox(false);
		},
		[selectedType, dropbox],
	);
	const onAddClicked = useCallback(() => {
		setPdfListEdit((prevList) => [...prevList, '']);
	}, [pdfListEdit]);
	const onSubClicked = (index: number) => {
		setPdfListEdit((prevList) => {
			// 배열에서 index 위치의 요소를 제외한 새 배열 생성
			const updatedList = prevList.filter((item, i) => i !== index);
			return updatedList;
		});
	};
	const uploadPdfHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>, index: number) => {
			const file = event.target.files?.[0];
			if (file) {
				const url = URL.createObjectURL(file);
				const updatedUrlList = [...pdfListEdit];
				updatedUrlList[index] = url;
				setPdfListEdit(updatedUrlList);
			}
		},
		[pdfListEdit, setPdfListEdit],
	);
	const onChangeTitleEdit = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setTitleEdit(e.target.value);
		},
		[titleEdit],
	);
	const onBackClicked = useCallback(() => {
		navigate('/insight');
		window.scrollTo(0, 0);
	}, []);
	const onApplyClicked = useCallback(
		(
			edit: boolean,
			id: number,
			type: string,
			pdfList: string[],
			title: string,
		) => {
			const filteredUrlList = pdfList.filter((item) => item !== '');
			const createTempInsight = () => ({
				id: id,
				type: type,
				text: edit
					? insightList.find((insight) => insight.id === id)?.text
					: '',
				date: edit
					? insightList.find((insight) => insight.id === id)?.date
					: '',
				pdfList: filteredUrlList,
				title: title,
				stored: edit
					? insightList.find((insight) => insight.id === id)?.stored
					: false,
			});

			const updatedInsights = edit
				? insightList.map((insight) =>
						insight.id === id ? createTempInsight() : insight,
				  )
				: [...insightList, createTempInsight()];

			setInsightList(updatedInsights);
			navigate('/insight');
			window.scrollTo(0, 0);
		},
		[
			edit,
			id,
			selectedType,
			pdfListEdit,
			titleEdit,
			insightList,
			setInsightList,
		],
	);
	return (
		<InsightInfo
			dropbox={dropbox}
			onDropboxClicked={onDropboxClicked}
			onTypeClicked={onTypeClicked}
			onAddClicked={onAddClicked}
			uploadPdfHandler={uploadPdfHandler}
			titleEdit={titleEdit}
			onChangeTitleEdit={onChangeTitleEdit}
			onBackClicked={onBackClicked}
			pdfListEdit={pdfListEdit}
			id={id}
			selectedType={selectedType}
			onApplyClicked={onApplyClicked}
			edit={edit}
			onSubClicked={onSubClicked}
		/>
	);
};

export default InsightInfoContainer;
