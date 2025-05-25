import { Sailing } from '../types';

interface Props {
  sailing: Sailing;
}

const CruiseCard: React.FC<Props> = ({ sailing }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold">{sailing.ship.name}</h2>
      <img src={sailing.ship.image} alt={sailing.ship.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <p>Duration: {sailing.duration} nights</p>
      <p>Destination: {sailing.itinerary}</p>
      <p>Region: {sailing.region}</p>
      <p>Price: ${sailing.price}</p>
      <p>Rating: ${sailing.ship.rating}</p>
      <p>Reviews: {sailing.ship.reviews}</p>
    </div>
  );
};

export default CruiseCard;
