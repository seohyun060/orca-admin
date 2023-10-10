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
	const type = location.state.Type;
	const title = location.state.Title;
	const pdfList = location.state.PdfList; // insight page 항목에서 넘겨받은 insight의 pdf url의 배열
	const [dropbox, setDropbox] = useState(false);
	const [selectedType, setSelectedType] = useState(type);
	// const [pdfEdit, setPdfEdit] = useState<string[]>(['']);
	const [pdfListEdit, setPdfListEdit] = useState<File[]>([]); // 새로 추가한 , 혹은 편집된 pdf 파일 배열
	const [titleEdit, setTitleEdit] = useState(title);
	const [urlList, setUrlList] = useState<string[]>(pdfList); // 넘겨받은 pdf url을 관리할 배열 state
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
		setUrlList((prevList) => [...prevList, '']);
	}, [urlList]);
	const uploadPdfHandler = (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const file = event.target.files?.[0];
		if (file) {
			const updatedPdfList = [...pdfListEdit, file];
			setPdfListEdit(updatedPdfList);
			const url = URL.createObjectURL(file);
			let updatedUrlList = [...urlList];
			updatedUrlList[index] = url;
			setUrlList(updatedUrlList);
			console.log(url, index);
			console.log(urlList);
		}
	};
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
			console.log(insightList[1].text);
		},
		[edit, id, selectedType, urlList, titleEdit, insightList, setInsightList],
	);
	return (
		<InsightInfo
			dropbox={dropbox}
			onDropboxClicked={onDropboxClicked}
			onTypeClicked={onTypeClicked}
			//pdfEdit={pdfEdit}
			onAddClicked={onAddClicked}
			pdfListEdit={pdfListEdit}
			uploadPdfHandler={uploadPdfHandler}
			titleEdit={titleEdit}
			onChangeTitleEdit={onChangeTitleEdit}
			onBackClicked={onBackClicked}
			urlList={urlList}
			pdfList={pdfList}
			id={id}
			selectedType={selectedType}
			onApplyClicked={onApplyClicked}
			edit={edit}
		/>
	);
};

export default InsightInfoContainer;
