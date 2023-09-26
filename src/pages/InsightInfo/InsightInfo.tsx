import React from 'react';
import images from 'src/assets/images';
import './styles/insightinfo.styles.css';
type Props = {};

const InsightInfo = (props: Props) => {
	return (
		<div className='insightinfo'>
			<div className='insightinfo-head'>
				<img src={images.back} />
				<div className='back'>Back</div>
				<div className='title'>인사이트 추가 페이지</div>
				<div className='upload'>올리기</div>
			</div>
			<div className='insightinfo-type'></div>
			<div className='insightinfo-pdf'></div>
			<div className='insightinfo-text'></div>
			<div className='insightinfo-divider'></div>
			<div className='insightinfo-preview'></div>
		</div>
	);
};

export default InsightInfo;
