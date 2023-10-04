import React from 'react';
import { Newsletters } from '@typedef/types';
import images from 'src/assets/images';
import './styles/orcagroup.styles.css';
type Props = {
	orcagroupList: Newsletters[];
	onTrashClick: (id: number) => void;
	downloadExcel: (data: Newsletters[]) => void;
};

const Orcagroup = ({ orcagroupList, onTrashClick, downloadExcel }: Props) => {
	return (
		<div className='orcagroup'>
			<div className='orcagroup-head'>
				<div className='title'>ORCA 그룹 가입 이메일 모음</div>
				<button
					onClick={() => {
						downloadExcel(orcagroupList);
					}}
				>
					Excel download
				</button>
			</div>
			<div className='orcagroup-body'>
				<div className='label'>
					<div className='type'>
						<span>이메일</span>
					</div>
				</div>
				{orcagroupList.map((orcagroup, index) => (
					<div className='list'>
						<div className='type'>
							<span>{orcagroup.email}</span>
						</div>

						<img
							src={images.trash}
							onClick={() => {
								onTrashClick(orcagroup.id);
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Orcagroup;
