import React, { useState } from 'react';

const Example = () => {
	const [isBVisible, setBVisible] = useState(false);

	const handleMouseEnter = () => {
		setBVisible(true);
	};

	const handleMouseLeave = () => {
		setBVisible(false);
	};

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ position: 'relative', width: '200px', height: '100px' }}
		>
			<h2>Component A</h2>
			{isBVisible && <ComponentB />}
		</div>
	);
};

const ComponentB = () => {
	return (
		<div
			style={{
				position: 'absolute',
				top: '100%',
				left: 0,
				backgroundColor: 'lightgray',
				padding: '10px',
				display: 'inline-block',
			}}
		>
			<h3>Component B</h3>
		</div>
	);
};

export default Example;
