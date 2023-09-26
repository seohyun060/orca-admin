import React, { useCallback, useState } from 'react';
import Gnb from '../Gnb';
import { GNBTableTypes } from '@typedef/types';
import { useNavigate } from 'react-router-dom';
import images from 'src/assets/images';
type Props = { location: string };

const GnbContainer = ({ location }: Props) => {
	const navigate = useNavigate();
	const tabTable: GNBTableTypes[] = [
		{
			label: 'Dashboard',
			path: '/dashboard',
			icon: images.dashboard,
		},
		{
			label: 'Home',
			path: '/',
			icon: images.home,
		},
		{
			label: 'Researcher',
			path: '/researcher',
			icon: images.researcher,
		},
		{
			label: 'Event',
			path: '/event',
			icon: images.event,
		},
		{
			label: 'Project',
			path: '/project',
			icon: images.project,
		},

		{
			label: 'Insight',
			path: '/insight',
			icon: images.insight,
		},
		{
			label: 'Newsletter',
			path: '/newsletter',
			icon: images.newsletter,
		},
		{
			label: 'ORCA Group',
			path: '/orcagroup',
			icon: images.orcagroup,
		},
	];
	const [selectedTab, setSelectedTab] = useState<string>('/');
	const onTabClicked = useCallback(
		(path: string) => {
			setSelectedTab(path);
			navigate(path);
			window.scrollTo(0, 0);
		},
		[selectedTab],
	);
	return <Gnb tabTable={tabTable} onTabClicked={onTabClicked} />;
};

export default GnbContainer;
