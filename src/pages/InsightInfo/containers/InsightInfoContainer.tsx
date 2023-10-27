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

	const [pdfListEdit, setPdfListEdit] = useState<string[]>(['']); // 넘겨받은 pdf url을 관리할 배열 state
	function createFileFromPath(filePath: string) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', filePath);
			xhr.responseType = 'blob';
			xhr.onload = () => {
				if (xhr.status === 200) {
					const blob = xhr.response;
					const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
					const file = new File([blob], fileName, { type: blob.type });
					resolve(file);
				} else {
					reject(new Error('파일을 읽을 수 없습니다.'));
				}
			};
			xhr.send();
		});
	}
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
	const onDeletePdf = useCallback(
		(index: number) => {
			const updatedList = [...selectedFiles];
			updatedList.splice(index, 1);
			setSelectedFiles(updatedList);
		},
		[selectedFiles],
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
		onDeletePdf(index);
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
		async (id: number, type: string, selectedFiles: File[], title: string) => {
			const filteredUrlList = selectedFiles.filter((item) => item !== null);
			const createTempInsight = () => ({
				id: id,
				category: type,
				title: title,
				files: selectedFiles,
			});
			// const updatedInsights = edit
			// 	? insightList.map((insight) =>
			// 			insight.id === id ? createTempInsight() : insight,
			// 	  )
			// 	: [...insightList, createTempInsight()];

			// setInsightList(updatedInsights);

			if (id == 0) {
				await postInsights(createTempInsight());
			} else {
				await putInsights(id, createTempInsight());
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
			});
		}

		return () => {};
	}, []);
	useEffect(() => {
		const createFilesPromises = pdfListEdit.map(createFileFromPath);
		Promise.all(createFilesPromises)
			.then((files: any) => {
				setSelectedFiles(files);
			})
			.catch((error) => {
				console.error('파일 생성 실패:', error);
			});
		return () => {};
	}, [pdfListEdit]);

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
			selectedType={selectedType}
			onApplyClicked={onApplyClicked}
			onSubClicked={onSubClicked}
			id={id}
			selectedFiles={selectedFiles}
			onDeletePdf={onDeletePdf}
		/>
	);
};

export default InsightInfoContainer;
