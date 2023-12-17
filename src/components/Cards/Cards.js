import './Cards.css';
import Card from '../Card/Card.js';

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
  return (
    <div className="container">
      <div className="card-deck">
        {shuffledDeck.map((card) => {
          return <Card card={card} />;
        })}
      </div>
    </div>
  );
}

export default Cards;
