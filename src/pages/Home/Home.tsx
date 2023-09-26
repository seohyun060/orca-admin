import React, { ChangeEvent } from 'react';

import home_banner from '../../assets/images/HOME/home_banner.png';
import '../Home/styles/home.styles.css';
import images from 'src/assets/images';
type Props = {
	selectedMain: File | null;
	selectedOrca: File | null;

	uploadMainHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	uploadOrcaHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Home = ({
	selectedMain,
	selectedOrca,
	uploadMainHandler,
	uploadOrcaHandler,
}: Props) => {
	return (
		<div className='home'>
			<div className='home main'>
				<div className='home main head'>
					<div>(메인 페이지) 배너파일 업로드</div>
					<button className='apply'>적용</button>
				</div>
				<div className='home main body'>
					<label htmlFor='mainInput'>
						{selectedMain ? (
							<p>{selectedMain.name}</p>
						) : (
							<img src={images.upload} alt='Upload' />
						)}
						<input
							type='file'
							id='mainInput'
							onChange={uploadMainHandler}
							style={{ display: 'none' }}
						/>
					</label>
				</div>
			</div>
			<div className='home orca'>
				<div className='home orca head'>
					<div>(소개 페이지) 배너파일 업로드</div>
					<button className='apply'>적용</button>
				</div>
				<div className='home orca body'>
					<label htmlFor='orcaInput'>
						{selectedOrca ? (
							<p>{selectedOrca.name}</p>
						) : (
							<img src={images.upload} alt='Upload' />
						)}
						<input
							type='file'
							id='orcaInput'
							onChange={uploadOrcaHandler}
							style={{ display: 'none' }}
						/>
					</label>
				</div>
			</div>
			<div className='home project'>
				<div className='home project head'>
					<div>Projects</div>
					<button className='apply'>적용</button>
				</div>
				<div className='home project body'>
					<div>
						<img src={images.link} />
					</div>
					<div>
						<img src={images.link} />
					</div>
					<div>
						<img src={images.link} />
					</div>
				</div>
			</div>
			<div className='home insight'>
				<div className='home insight head'>
					<div>Insights</div>
					<button className='apply'>적용</button>
				</div>
				<div className='home insight body'>
					<div>
						<img src={images.link} />
					</div>
					<div>
						<img src={images.link} />
					</div>
					<div>
						<img src={images.link} />
					</div>
					<div>
						<img src={images.link} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
