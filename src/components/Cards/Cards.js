import './Cards.css';
import Card from '../Card/Card.js';
import { useEffect, useState } from 'react';

const deck = ['SA', 'SA', 'CA', 'CA', 'HA', 'HA', 'DA', 'DA'];

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

function Cards() {
  const [shuffledDeck, setShuffledDeck] = useState(() => shuffle(deck));
  const [shownCards, setShownCards] = useState([]);
  const [tries, setTries] = useState(0);
  const [allTries, setAllTries] = useState(0);
  const [gamesEnd, setGamesEnd] = useState(false);

  const startNewGame = () => {
    setShownCards([]);
    setTries(0);
    setAllTries(0);
    setShuffledDeck(shuffle(deck));
    setGamesEnd(false);
  };

  const clickOnCard = (index) => {
    // not count tries on active card
    if (cardIsActive(index)) {
      return;
    }
    if (tries < 2) {
      setShownCards((previousValue) => {
        return [...previousValue, index];
      });
      setTries((previousValue) => previousValue + 1);
    }
    setAllTries((e) => e + 1);
  };

  const cardIsActive = (index) => shownCards.includes(index);

  useEffect(() => {
    if (shownCards.length === 8) {
      setGamesEnd(true);
    }
  }, [shownCards, setGamesEnd]);

  useEffect(() => {
    // componentDidMount
    const checkActualCards = () => {
      const firstChoice = shuffledDeck[shownCards.slice(-2)[0]]; // second last element from array
      const secondChoice = shuffledDeck[shownCards.slice(-1)[0]]; // last element from array
      if (firstChoice !== secondChoice) {
        setShownCards((previousValue) => {
          return previousValue.slice(0, -2);
        });
      }
      setTries(0);
    };

    if (tries === 2) {
      setTimeout(checkActualCards, 1000);
    }
    // componentWillUnMount
    return () => {};
  }, [tries, shownCards, setShownCards, shuffledDeck]);

  return (
    <div>
      {gamesEnd ? (
        <div className="container">
          <h1>You won the game :) </h1>
          <h4>Your total tries: {allTries}</h4>
        </div>
      ) : (
        <div></div>
      )}
      <div className="container">
        <div className="card-deck">
          {shuffledDeck.map((card, index) => {
            return (
              <Card
                card={card}
                key={index}
                isActive={cardIsActive(index)}
                clickOnCard={() => clickOnCard(index)}
              />
            );
          })}
        </div>
      </div>
      <div className="container">
        <button className="btn" onClick={() => startNewGame()}>
          Start new game
        </button>
      </div>
    </div>
  );
}

export default Cards;
