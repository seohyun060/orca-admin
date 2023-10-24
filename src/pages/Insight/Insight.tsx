import React from 'react';
import { Insights, InsightApi } from '@typedef/types';
import images from 'src/assets/images';
import './styles/insight.styles.css';
import { EChange } from '@typedef/types';
type Props = {
	insightList: InsightApi[];
	displayedColor: number;
	onDisplayedClick: () => void;
	storedColor: number;
	onStoredClick: () => void;
	search: string;
	onSetSearch: (e: EChange) => void;
	stored: boolean;
	filteredList: InsightApi[];
	onStoredisplayClick: (filteredList: InsightApi[], index: number) => void;
	onTrashClick: (index: number) => void;
	onEditClicked: (id: number) => void;
	formatDate: (date: Date) => string;
};

const Insight = ({
	insightList,
	displayedColor,
	onDisplayedClick,
	storedColor,
	onStoredClick,
	search,
	onSetSearch,
	stored,
	filteredList,
	onStoredisplayClick,
	onTrashClick,
	onEditClicked,
	formatDate,
}: Props) => {
	return (
		<div className='insight'>
			<div className='insight-head'>
				<div
					className='title'
					style={{ opacity: displayedColor }}
					onClick={() => {
						onDisplayedClick();
					}}
				>
					인사이트 리스트
				</div>
				<div
					className='title'
					style={{ opacity: storedColor }}
					onClick={() => {
						onStoredClick();
					}}
				>
					인사이트 보관 리스트
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
						onEditClicked(0);
					}}
				>
					인사이트 추가
				</button>
			</div>
			<div className='insight-body'>
				<div className='label'>
					<div className='type'>
						<span>위치</span>
					</div>
					<div className='title'>
						<span>제목</span>
					</div>
					<div className='date'>
						<span>날짜</span>
					</div>
				</div>
				{filteredList.map((insight, index) =>
					insight.isStored == stored ? (
						<div className='list'>
							<div className='type'>
								<span>{insight.category}</span>
							</div>
							<div className='title'>
								<span>{insight.title}</span>
							</div>
							<div className='date'>
								<span>{formatDate(insight.createDate)}</span>
								<button
									className='store'
									onClick={() => {
										onStoredisplayClick(insightList, insight.id);
									}}
								>
									{stored ? '게시' : '보관'}
								</button>
								<button
									className='edit'
									onClick={() => {
										onEditClicked(insight.id);
									}}
								>
									편집
								</button>
							</div>
							<img
								src={images.trash}
								onClick={() => {
									onTrashClick(insight.id);
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
export default Insight;
