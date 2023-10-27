import React from 'react';
import './styles/newsletter.styles.css';
import images from 'src/assets/images';
import { Newsletters } from '@typedef/types';
type Props = {
	newsletterList: Newsletters[];
	onTrashClick: (id: number) => void;
	downloadExcel: (data: Newsletters[]) => void;
};

const Newsletter = ({ newsletterList, onTrashClick, downloadExcel }: Props) => {
	return (
		<div className='newsletter'>
			<div className='newsletter-head'>
				<div className='title'>뉴스레터 구독 이메일 모음</div>
				<button
					onClick={() => {
						downloadExcel(newsletterList);
					}}
				>
					Excel download
				</button>
			</div>
			<div className='newsletter-body'>
				<div className='label'>
					<div className='type'>
						<span>이메일</span>
					</div>
				</div>
				{newsletterList.map((newsletter, index) => (
					<div className='list' key={index}>
						<div className='type'>
							<span>{newsletter.email}</span>
						</div>

						<img
							src={images.trash}
							onClick={() => {
								onTrashClick(newsletter.id);
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Newsletter;
