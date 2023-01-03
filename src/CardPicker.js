import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';
import './CardPicker.css';
import { v4 as uuid } from 'uuid';

const CardPicker = () => {
	const [ deck_id, setDeck ] = useState(undefined);
	const [ cards, setCards ] = useState([]);
	const [ cardCount, setCardCount ] = useState(52);
	const [ toggleBtn, setToggleBtn ] = useState(true);
	const timerID = useRef();

	useEffect(() => {
		async function deck() {
			const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle');
			setDeck(res.data.deck_id);
		}
		deck();
	}, []);

	async function DrawEverySecond() {
		const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
		const cardData = {
			id: uuid(),
			image: res.data.cards[0].image,
			suit: res.data.cards[0].suit,
			value: res.data.cards[0].value,
			cardCount: res.data.remaining
		};
		setCards((cards) => [ ...cards, cardData ]);
		setCardCount(res.data.remaining);
	}

	const drawcard2 = (e) => {
		setToggleBtn(!toggleBtn);
		timerID.current = setInterval(() => {
			DrawEverySecond();
		}, 100);
	};

	const stopdrawing = () => {
		clearInterval(timerID.current);
		setToggleBtn(!toggleBtn);
	};

	//! this below is for part 1--- dont remove
	// const drawcard = (e) => {
	// 	async function card() {
	// 		const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);
	// 		const cardData = {
	// 			id: uuid(),
	// 			image: res.data.cards[0].image,
	// 			suit: res.data.cards[0].suit,
	// 			value: res.data.cards[0].value,
	// 			cardCount: res.data.remaining
	// 		};
	// 		setCards((cards) => [ ...cards, cardData ]);
	// 		setCardCount(res.data.remaining);
	// 	}
	// 	card();
	// };

	const stack = cards.map(({ image, id }) => {
		return <Card image={image} key={id} />;
	});

	if (cardCount < 1) {
		clearInterval(timerID.current);
	}

	return (
		<div className="CardPicker">
			<h1>CardPicker</h1>
			<h3> Number of Cards left:{cardCount} </h3>
			{/* this below is for part 1--- dont remove */}
			{/* <button onClick={drawcard}>Draw Card</button> */}
			<div>
				{toggleBtn ? (
					<button onClick={drawcard2}>Start Draw</button>
				) : (
					<button onClick={stopdrawing}>End Draw</button>
				)}
			</div>
			{cardCount > 0 ? <div className="CardPicker-Stack">{stack}</div> : <h2> You are out of cards</h2>}
		</div>
	);
};

export default CardPicker;
