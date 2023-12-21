import './Card.css';

function Card({ card, isActive, clickOnCard, isDisabled }) {
  return (
    <div className={`card card-type-${card}`} onClick={clickOnCard}>
      <div className={isActive ? 'front' : 'back'}></div>
    </div>
  );
}

export default Card;
