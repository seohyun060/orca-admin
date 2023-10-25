import React, { ChangeEvent } from 'react';
import { EChange } from '@typedef/types';
import home_banner from '../../assets/images/HOME/home_banner.png';
import '../Home/styles/home.styles.css';
import images from 'src/assets/images';
type Props = {
	selectedMain: File | null;
	selectedOrca: File | null;

	uploadMainHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	uploadOrcaHandler: (event: ChangeEvent<HTMLInputElement>) => void;
	selectedProjects: string[];
	onChangeProjects: (e: EChange, index: number) => void;
	onProjectSubmit: () => void;
	selectedInsights: string[];
	onChangeInsights: (e: EChange, index: number) => void;
	onInsightSubmit: () => void;
	onOrcaBannerSubmit: () => void;
	onMainBannerSubmit: () => void;
};

const Home = ({
	selectedMain,
	selectedOrca,
	uploadMainHandler,
	uploadOrcaHandler,
	selectedProjects,
	onChangeProjects,
	onProjectSubmit,
	selectedInsights,
	onChangeInsights,
	onInsightSubmit,
	onOrcaBannerSubmit,
	onMainBannerSubmit,
}: Props) => {
	return (
		<div className='home'>
			<div className='home main'>
				<div className='home main head'>
					<div>(메인 페이지) 배너파일 업로드</div>
					<button
						className='apply'
						onClick={() => {
							onMainBannerSubmit();
						}}
					>
						적용
					</button>
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
					<button
						className='apply'
						onClick={() => {
							onOrcaBannerSubmit();
						}}
					>
						적용
					</button>
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
					<button
						className='apply'
						onClick={() => {
							onProjectSubmit();
						}}
					>
						적용
					</button>
				</div>
				<div className='home project body'>
					{selectedProjects.map((project, index) => (
						<div key={index}>
							<img src={images.link} />
							<input
								value={project}
								onChange={(e) => {
									onChangeProjects(e, index);
								}}
							></input>
						</div>
					))}
				</div>
			</div>
			<div className='home insight'>
				<div className='home insight head'>
					<div>Insights</div>
					<button
						className='apply'
						onClick={() => {
							onInsightSubmit();
						}}
					>
						적용
					</button>
				</div>
				<div className='home insight body'>
					{selectedInsights.map((insight, index) => (
						<div key={index}>
							<img src={images.link} />
							<input
								value={insight}
								onChange={(e) => {
									onChangeInsights(e, index);
								}}
							></input>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
