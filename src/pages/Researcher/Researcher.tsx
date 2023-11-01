import React from 'react';
import './styles/researcher.styles.css';
import { EChange, ResearcherList } from '@typedef/types';
import images from 'src/assets/images';
import { OnSetEdit } from '@typedef/types';
type Props = {
	stored: boolean;
	search: string;
	onSetSearch: (e: EChange) => void;
	filteredList: ResearcherList;
	displayedColor: number;
	storedColor: number;
	onDisplayedClick: () => void;
	onStoredClick: () => void;
	onStoredisplayClick: (filteredList: ResearcherList, index: number) => void;
	onTrashClick: (index: number) => void;
	onSetEdit: (id: number) => void;
	researcherList: ResearcherList;
};

const Researcher = ({
	stored,
	search,
	onSetSearch,
	filteredList,
	displayedColor,
	storedColor,
	onDisplayedClick,
	onStoredClick,
	onStoredisplayClick,
	onTrashClick,
	onSetEdit,
	researcherList,
}: Props) => {
	return (
		<div className='researcher'>
			<div className='researcher-head'>
				<div
					className='title'
					style={{ opacity: displayedColor }}
					onClick={() => {
						onDisplayedClick();
					}}
				>
					연구자 리스트
				</div>
				<div
					className='title'
					style={{ opacity: storedColor }}
					onClick={() => {
						onStoredClick();
					}}
				>
					연구자 보관 리스트
				</div>

				<div className='search'>
					<input
						placeholder='search'
						onChange={onSetSearch}
						required
						value={search}
					></input>
					{search ? <img src={images.search_b} /> : <img src={images.search} />}
				</div>
				<button
					disabled={stored ? true : false}
					className={stored ? 'add' : 'add-active'}
					style={{
						color: stored ? '#9E9E9E' : '#fff',
					}}
					onClick={() => {
						onSetEdit(0);
					}}
				>
					사용자 추가
				</button>
			</div>
			<div className='researcher-body'>
				<div className='label'>
					<div className='name'>
						<span>이름</span>
					</div>
					<div className='department'>
						<span>소속</span>ß
					</div>
					<div className='project'>
						<span>프로젝트</span>
					</div>
				</div>
				{filteredList.map((researcher, index) =>
					researcher.stored == stored ? (
						<div className='list' key={index}>
							<div className='name'>
								<span>{researcher.name}</span>
							</div>
							<div className='department'>
								<span>{researcher.department}</span>
							</div>
							<div className='project'>
								<span>{researcher.project}</span>
								<button
									className='store'
									onClick={() => {
										onStoredisplayClick(researcherList, researcher.id);
									}}
								>
									{stored ? '게시' : '보관'}
								</button>
								<button
									className='edit'
									onClick={() => {
										onSetEdit(researcher.id);
									}}
								>
									편집
								</button>
							</div>
							<img
								src={images.trash}
								onClick={() => {
									onTrashClick(researcher.id);
								}}
							/>
						</div>
					) : (
						''
					),
				)}
			</div>
		</div>
	);
};

export default Researcher;
