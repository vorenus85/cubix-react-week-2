import './Card.css';

function Card({ card }) {
  return (
    <div className={`card card-type-${card}`}>
      <div className="back"></div>
      <div className="front"></div>
    </div>
  );
}

export default Card;
