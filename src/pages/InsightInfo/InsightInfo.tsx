import React, { ChangeEvent } from 'react';
import images from 'src/assets/images';
import './styles/insightinfo.styles.css';
import { OnApplyInsight } from '@typedef/types';
type Props = {
	dropbox: boolean;
	onDropboxClicked: () => void;
	onTypeClicked: (type: string) => void;
	//pdfEdit: string[];
	onAddClicked: () => void;
	pdfListEdit: File[];
	uploadPdfHandler: (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => void;
	insightTextEdit: string;
	onChangeInsightTextEdit: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBackClicked: any;
	urlList: string[];
	pdfList: string[];
	id: number;
	selectedType: string;
	onApplyClicked: OnApplyInsight;
	edit: boolean;
};

const InsightInfo = ({
	dropbox,
	onDropboxClicked,
	onTypeClicked,
	//pdfEdit,
	onAddClicked,
	pdfListEdit,
	uploadPdfHandler,
	insightTextEdit,
	onChangeInsightTextEdit,
	onBackClicked,
	urlList,
	pdfList,
	id,
	selectedType,
	onApplyClicked,
	edit,
}: Props) => {
	const insightTypes: string[] = [
		'White paper',
		'Publicaiton',
		'News',
		'Education',
	];
	return (
		<div className='insightinfo'>
			<div className='insightinfo-head'>
				<img src={images.back} onClick={onBackClicked} />
				<div className='back' onClick={onBackClicked}>
					Back
				</div>
				<div className='title'>인사이트 추가 페이지</div>
				<div
					className='upload'
					onClick={() => {
						onApplyClicked(edit, id, selectedType, urlList, insightTextEdit);
					}}
				>
					올리기
				</div>
			</div>
			<div className='insightinfo-type'>
				<div className='dropdown-button' onClick={onDropboxClicked}>
					<div>{selectedType}</div>
					<img src={images.down_b} />
				</div>
				{dropbox ? (
					<div className='dropdown-container'>
						<div className='dropdown-content'>
							{insightTypes.map((type) => (
								<div
									key={type}
									className='dropdown-item'
									onClick={() => {
										onTypeClicked(type);
									}}
								>
									{type}
								</div>
							))}
						</div>
					</div>
				) : (
					''
				)}
			</div>
			<div className='insightinfo-pdf'>
				{urlList.length === 0 ? (
					<div className='lastitem'>
						<div className='box'>
							<label htmlFor='mainInput'>
								<img src={images.download} alt='Upload' />
								<div className='text'>Upload PDF</div>
								<input
									type='file'
									id='mainInput'
									onChange={(e) => {
										uploadPdfHandler(e, 0);
									}}
									style={{ display: 'none' }}
								/>
							</label>
						</div>
						<img className='add' src={images.add} onClick={onAddClicked}></img>
					</div>
				) : (
					urlList.map((pdf, index) => {
						if (index === urlList.length - 1) {
							return (
								<div key={index} className='lastitem'>
									<div className='box'>
										<label htmlFor={`mainInput-${index}`}>
											<img src={images.download} alt='Upload' />
											<div className='text'>Upload PDF</div>

											<p>{pdf}</p>

											<input
												type='file'
												id={`mainInput-${index}`}
												onChange={(e) => {
													uploadPdfHandler(e, index);
												}}
												style={{ display: 'none' }}
											/>
										</label>
									</div>
									<img
										className='add'
										src={images.add}
										onClick={onAddClicked}
									></img>
								</div>
							);
						} else {
							return (
								<div key={index} className='box'>
									<label htmlFor='mainInput'>
										<img src={images.download} alt='Upload' />
										<div className='text'>Upload PDF</div>

										<p>{pdf}</p>

										<input
											type='file'
											id='mainInput'
											onChange={(e) => {
												uploadPdfHandler(e, index);
											}}
											style={{ display: 'none' }}
										/>
									</label>
								</div>
							);
						}
					})
				)}
			</div>
			<div className='insightinfo-text'>
				<div className='head'>인사이드 텍스트</div>
				<textarea
					onChange={onChangeInsightTextEdit}
					required
					value={insightTextEdit}
				></textarea>
			</div>
			<div className='insightinfo-divider'></div>
			<div className='insightinfo-preview'>
				<div className='head'>미리보기</div>

				{urlList.map((url, index) => {
					if (url) {
						// Check if url is not an empty string
						return (
							<iframe
								key={index}
								src={urlList[index]}
								height='776x'
								title='PDF Viewer'
							/>
						);
					}
					return null; // Return null for empty url
				})}
			</div>
		</div>
	);
};

export default InsightInfo;
