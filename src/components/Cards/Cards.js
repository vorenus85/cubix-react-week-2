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
    if (tries < 2) {
      shownCards.push(index);
      setShownCards(shownCards);
      setTries(tries + 1);
      console.log(shownCards);
    } else {
      // setTries(0);
      // setShownCards([]);
    }
  };

  const cardIsActive = (index) => {
    const result = shownCards.includes(index);
    return result;
  };

  useEffect(() => {
    // componentDidMount
    const checkShownCards = () => {
      const first = shuffledDeck[shownCards[0]];
      const second = shuffledDeck[shownCards[1]];
      console.log(first, second);
    };

    if (tries === 2) {
      checkShownCards();
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
