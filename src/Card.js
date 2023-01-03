import React from 'react';
import './Card.css';

const Card = ({ image }) => {
	return (
		<div className="Card">
			<div className="Card-image">
				<img src={image} />
			</div>
		</div>
	);
};

export default Card;
