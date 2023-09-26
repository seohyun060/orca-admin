import React, { ChangeEvent, ChangeEventHandler } from 'react';
import './styles/researcherinfo.styles.css';
import Map from './components/Map';
import images from 'src/assets/images';
import { EChange, OnApplyClicked } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
type Props = {
	edit: boolean;
	id: number;
	mapDisplay: boolean;
	onMapDisplayClicked: () => void;
	dropbox: boolean;
	onDropboxClicked: () => void;
	nameEdit: string;
	departmentEdit: string;
	projectEdit: string;
	onChangeNameEdit: (e: EChange) => void;
	onChangeDepartmentEdit: (e: EChange) => void;
	onChangeProjectEdit: (e: EChange) => void;
	selectedProfile: File | null;
	uploadProfileHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	profile: string;
	linkEdit: string;
	twitterEdit: string;
	biographyEdit: string;
	onChangeLinkEdit: (e: EChange) => void;
	onChangeTwitterEdit: (e: EChange) => void;
	onChangeBiographyEdit: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	publicationEdit: string[];
	onChangePublicationEdit: (e: EChange, index: number) => void;
	locationEdit: number;
	onLocationClicked: (mapNumber: number) => void;
	onAddClicked: () => void;
	onApplyClicked: OnApplyClicked;
};

const ResearcherInfo = ({
	edit,
	id,
	mapDisplay,
	onMapDisplayClicked,
	dropbox,
	onDropboxClicked,
	nameEdit,
	departmentEdit,
	projectEdit,
	onChangeNameEdit,
	onChangeDepartmentEdit,
	onChangeProjectEdit,
	selectedProfile,
	uploadProfileHandler,
	profile,
	linkEdit,
	twitterEdit,
	biographyEdit,
	onChangeLinkEdit,
	onChangeTwitterEdit,
	onChangeBiographyEdit,
	publicationEdit,
	onChangePublicationEdit,
	locationEdit,
	onLocationClicked,
	onAddClicked,
	onApplyClicked,
}: Props) => {
	const mapItems = Array.from({ length: 32 }, (_, index) => index + 1);
	const navigate = useNavigate();
	return (
		<div className='researcherinfo'>
			<div className='researcherinfo-head'>
				<div>사용자 추가 / 편집</div>
				<button
					onClick={() => {
						onApplyClicked(
							edit,
							id,
							locationEdit,
							nameEdit,
							departmentEdit,
							projectEdit,
							selectedProfile,
							linkEdit,
							twitterEdit,
							biographyEdit,
							publicationEdit,
						);
						navigate('/researcher');
						window.scrollTo(0, 0);
					}}
				>
					적용
				</button>
			</div>
			<div className='researcherinfo-map'>
				<div
					className='map-button'
					onClick={() => {
						onMapDisplayClicked();
					}}
				>
					<div>연구자 세계지도 추가 위치 번호</div>

					<img src={mapDisplay ? images.up_w : images.down_w} />
				</div>
				{mapDisplay ? (
					<>
						<div className='map-body'>
							{mapItems.map((item) => (
								<div key={item} className='grid-item'>
									{item}
								</div>
							))}
						</div>
						<Map />
					</>
				) : (
					''
				)}
			</div>
			<div className='divider' />
			<div className='researcherinfo-body'>
				<div className='numbering'>
					<div className='text'>세계지도 위치 번호</div>

					<div className='dropdown-button' onClick={onDropboxClicked}>
						<div className='location'>{locationEdit}</div>
						<img src={images.down_b} />
					</div>
					{dropbox ? (
						<div className='dropdown-container'>
							<div className='dropdown-content'>
								{mapItems.map((item) => (
									<div
										key={item}
										className='dropdown-item'
										onClick={() => {
											onLocationClicked(item);
										}}
									>
										{item}
									</div>
								))}
							</div>
						</div>
					) : (
						''
					)}
				</div>
				<div className='info'>
					<div className='name'>
						<div className='text'>이름</div>
						<input
							onChange={onChangeNameEdit}
							required
							value={nameEdit}
						></input>
					</div>
					<div className='department'>
						<div className='text'>소속</div>
						<input
							onChange={onChangeDepartmentEdit}
							required
							value={departmentEdit}
						></input>
					</div>
					<div className='project'>
						<div className='text'>프로젝트</div>
						<input
							onChange={onChangeProjectEdit}
							required
							value={projectEdit}
						></input>
					</div>
				</div>
				<div className='profile-image'>
					<label htmlFor='mainInput'>
						<img src={images.download} alt='Upload' />
						<div className='text'>User profile Image</div>
						{selectedProfile ? <p>{selectedProfile.name}</p> : <p>{profile}</p>}
						<input
							type='file'
							id='mainInput'
							onChange={uploadProfileHandler}
							style={{ display: 'none' }}
						/>
					</label>
				</div>
				<div className='link'>
					<div className='text'>Link</div>
					<img src={images.link} />
					<input onChange={onChangeLinkEdit} required value={linkEdit}></input>
				</div>
				<div className='twitter'>
					<div className='text'>Twitter</div>
					<img src={images.link} />
					<input
						onChange={onChangeTwitterEdit}
						required
						value={twitterEdit}
					></input>
				</div>
				<div className='biography'>
					<div className='head'>Biography</div>
					<textarea
						onChange={onChangeBiographyEdit}
						required
						value={biographyEdit}
					></textarea>
				</div>
				<div className='publication'>
					<div className='head'>Publications</div>
					{publicationEdit.length === 0 ? (
						<div className='lastitem'>
							<div className='box'>
								<img src={images.link} />
								<input
									onChange={(e) => {
										onChangePublicationEdit(e, 0);
									}}
									value={''}
								></input>
							</div>
							<img
								className='add'
								src={images.add}
								onClick={onAddClicked}
							></img>
						</div>
					) : (
						publicationEdit.map((publication, index) => {
							if (index === publicationEdit.length - 1) {
								return (
									<div key={index} className='lastitem'>
										<div className='box'>
											<img src={images.link} />
											<input
												onChange={(e) => {
													onChangePublicationEdit(e, index);
												}}
												value={publicationEdit[index]}
											></input>
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
										<img src={images.link} />
										<input
											onChange={(e) => {
												onChangePublicationEdit(e, index);
											}}
											value={publicationEdit[index]}
										></input>
									</div>
								);
							}
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default ResearcherInfo;
