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
	uploadPdfHandler: (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => void;
	titleEdit: string;
	onChangeTitleEdit: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBackClicked: any;
	pdfListEdit: string[];
	id: number;
	selectedType: string;
	onApplyClicked: OnApplyInsight;
	edit: boolean;
	onSubClicked: (index: number) => void;
};

const InsightInfo = ({
	dropbox,
	onDropboxClicked,
	onTypeClicked,
	onAddClicked,
	uploadPdfHandler,
	titleEdit,
	onChangeTitleEdit,
	onBackClicked,
	pdfListEdit,
	id,
	selectedType,
	onApplyClicked,
	edit,
	onSubClicked,
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
						onApplyClicked(edit, id, selectedType, pdfListEdit, titleEdit);
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
				{pdfListEdit.length === 0 ? (
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
					pdfListEdit.map((pdf, index) => (
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
							{index === pdfListEdit.length - 1 ? (
								<img
									className='add'
									src={images.add}
									onClick={() => {
										onAddClicked();
									}}
								></img>
							) : (
								<img
									className='sub'
									src={images.sub}
									onClick={() => {
										onSubClicked(index);
									}}
								></img>
							)}
						</div>
					))
				)}
			</div>
			<div className='insightinfo-text'>
				<div className='head'>인사이드 제목</div>
				<textarea
					onChange={onChangeTitleEdit}
					required
					value={titleEdit}
				></textarea>
			</div>
			<div className='insightinfo-divider'></div>
			<div className='insightinfo-preview'>
				<div className='head'>미리보기</div>

				{pdfListEdit.map((url, index) => {
					if (url) {
						// Check if url is not an empty string
						return (
							<iframe
								key={index}
								src={pdfListEdit[index]}
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
