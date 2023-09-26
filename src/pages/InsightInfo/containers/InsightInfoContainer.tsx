import React from 'react';
import InsightInfo from '../InsightInfo';
import { Insights } from '@typedef/types';
type Props = { insightList: Insights[]; setInsightList: any };

const InsightInfoContainer = ({ insightList, setInsightList }: Props) => {
	return <InsightInfo />;
};

export default InsightInfoContainer;
