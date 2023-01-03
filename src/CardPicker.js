import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import './CardPicker.css';

const CardPicker = () => {
	const INITAL_STATE = [
		{
			deck_id: ''
		}
	];
	const [ deck_id, setDeck ] = useState(undefined);
	const [ cards, setCards ] = useState([]);
	const [ cardCount, setCardCount ] = useState();

	useEffect(() => {
		async function deck() {
			const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
			setDeck(res.data.deck_id);
		}
		deck();
	}, []);

	const drawcard = (e) => {
		async function card() {
			const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
			console.log(res);
			const cardData = {
				image: res.data.cards[0].image,
				suit: res.data.cards[0].suit,
				value: res.data.cards[0].value,
				cardCount: res.data.remaining
			};
			setCards((cards) => [ ...cards, cardData ]);
			setCardCount(res.data.remaining);
		}
		card();
	};

	const stack = cards.map(({ image, cardCount }) => {
		return <Card image={image} cardCount={cardCount} />;
	});

	return (
		<div className="CardPicker">
			<h1>CardPicker</h1>
			<h3> Number of Cards left:{cardCount} </h3>
			<button onClick={drawcard}>Draw Card</button>
			{cardCount > 0 ? <div className="CardPicker-Stack">{stack}</div> : <h2> You are out of cards</h2>}
		</div>
	);
};

export default CardPicker;
