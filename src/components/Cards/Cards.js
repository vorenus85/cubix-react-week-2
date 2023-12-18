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

const shuffledDeck = shuffle(deck);

function Cards() {
  const [shownCards, setShownCards] = useState([]);
  const [tries, setTries] = useState(0);

  const clickOnCard = (index) => {
    // not count tries on active card
    if (cardIsActive(index)) {
      return;
    }
    if (tries < 2) {
      shownCards.push(index);
      setShownCards(shownCards);
      setTries(tries + 1);
    }
  };

  const cardIsActive = (index) => {
    const result = shownCards.includes(index);
    return result;
  };

  useEffect(() => {
    // componentDidMount
    const checkActualCards = () => {
      const shownCardLength = shownCards.length;
      const first = shuffledDeck[shownCards[shownCardLength - 2]];
      const second = shuffledDeck[shownCards[shownCardLength - 1]];
      if (first !== second) {
        shownCards.pop();
        shownCards.pop();
        setShownCards(shownCards);
      }
      setTries(0);
    };

    if (tries === 2) {
      setTimeout(checkActualCards, 1000);
    }
    // componentWillUnMount
    return () => {};
  }, [tries, shownCards]);

  return (
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
  );
}

export default Cards;
