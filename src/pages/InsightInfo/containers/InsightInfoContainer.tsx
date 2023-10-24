import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import InsightInfo from '../InsightInfo';
import { Insights } from '@typedef/types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	getInsightDetail,
	postInsights,
	putInsights,
} from 'src/api/InsightAPI';
type Props = {};

const InsightInfoContainer = ({}: Props) => {
	const navigate = useNavigate();
	const location = useLocation();
	//const edit = location.state.Edit;
	//const id = location.state.Id;
	const params = useParams();
	const [id, setId] = useState(0);

	const [dropbox, setDropbox] = useState(false);
	const [selectedType, setSelectedType] = useState('');
	const [titleEdit, setTitleEdit] = useState('');
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const [pdfListEdit, setPdfListEdit] = useState<string[]>([]); // 넘겨받은 pdf url을 관리할 배열 state

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
			console.log(file);
			if (file) {
				const url = URL.createObjectURL(file);
				const updatedUrlList = [...pdfListEdit];
				updatedUrlList[index] = url;
				setPdfListEdit(updatedUrlList);
				setSelectedFiles([...selectedFiles, file]);
			}
		},
		[pdfListEdit, setPdfListEdit],
	);
	console.log(selectedFiles);
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
		(id: number, type: string, selectedFiles: File[], title: string) => {
			const filteredUrlList = selectedFiles.filter((item) => item !== null);
			const createTempInsight = () => ({
				id: id,
				category: type,
				title: title,
				files: selectedFiles,
			});
			console.log(createTempInsight());
			// const updatedInsights = edit
			// 	? insightList.map((insight) =>
			// 			insight.id === id ? createTempInsight() : insight,
			// 	  )
			// 	: [...insightList, createTempInsight()];

			// setInsightList(updatedInsights);
			if (id == 0) {
				console.log('제발요');
				postInsights(createTempInsight());
			} else {
				putInsights(id, createTempInsight());
			}

			navigate('/insight');
			window.scrollTo(0, 0);
		},
		[
			// edit,
			// id,
			selectedType,
			pdfListEdit,
			titleEdit,
			// insightList,
			// setInsightList,
		],
	);
	useEffect(() => {
		if (params.id != '0') {
			getInsightDetail(params.id).then((data) => {
				console.log(data.data); // 나옴
				//const updatedList: ResearcherList = [];
				setId(data.data.id);
				setSelectedType(data.data.category);
				setPdfListEdit(data.data.files);
				setTitleEdit(data.data.title);
				// if (data.data.publications.length != 0) {
				// 	const updatedPublication = [...publicationEdit];
				// 	for (let i = 0; i < pubAPI.length; i++) {
				// 		updatedPublication[i].title = pubAPI[i].title;
				// 		updatedPublication[i].author = pubAPI[i].author;
				// 		updatedPublication[i].year = pubAPI[i].pubYear;
				// 		updatedPublication[i].journal = pubAPI[i].journal;
				// 		updatedPublication[i].conference = pubAPI[i].conference;
				// 		updatedPublication[i].ho = pubAPI[i].volume;
				// 		updatedPublication[i].link = pubAPI[i].link;
				// 	}
				// 	setPublicationEdit(updatedPublication);
				// 	console.log(updatedPublication);
				// }

				//console.log(researcherList); // 안나옴
			});
		}

		return () => {};
	}, []);

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
			//id={id}
			selectedType={selectedType}
			onApplyClicked={onApplyClicked}
			//edit={edit}
			onSubClicked={onSubClicked}
			id={id}
			selectedFiles={selectedFiles}
		/>
	);
};

export default InsightInfoContainer;
