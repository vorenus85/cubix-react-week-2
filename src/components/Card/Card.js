import './Card.css';

function Card({ card, isActive, clickOnCard, isDisabled }) {
  return (
    <div className={`card card-type-${card}`} onClick={clickOnCard}>
      {isActive ? <div className="front"></div> : <div className="back"></div>}
    </div>
  );
}

export default Card;
