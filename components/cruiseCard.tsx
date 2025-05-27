/**
 * @file CruiseCard.tsx
 * @author Hector
 * @date 2025-05-25
 * @description CruiseCard component displays cruise sailing information in a card layout.
 * @observations The rating sorting was not implemented as the rating was a constant value in the provided data.
 */



import { Sailing } from '../types';
import { Star } from 'lucide-react'; // O cualquier icono que uses

interface Props {
  sailing: Sailing;
}

const formatDateRange = (startStr: string, endStr: string) => {
  const start = new Date(startStr);
  const end = new Date(endStr);

  const sameMonth = start.getMonth() === end.getMonth();
  const month = start.toLocaleString('en-US', { month: 'short' }); // Ej: "Nov"
  const year = start.getFullYear();

  const startDay = start.getDate();
  const endDay = end.getDate();

  return sameMonth
    ? `${month} ${startDay}–${endDay}, ${year}`
    : `${start.toLocaleString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleString('en-US', { month: 'short', day: 'numeric' })}, ${year}`;
};


const CruiseCard: React.FC<Props> = ({ sailing }) => {
  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden w-full h-52">
      {/* Image section */}
      <div className="relative w-1/3">
        <img
          src={sailing.ship.image}
          alt={sailing.ship.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black text-white text-sm px-3 py-1 rounded">
          {sailing.departureDate && sailing.returnDate
            ? formatDateRange(sailing.departureDate, sailing.returnDate)
            : sailing.departureDate
            ? new Date(sailing.departureDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : "Date TBD"}
        </div>  
      </div>

      {/* Details section */}
      <div className="flex flex-col justify-between p-4 w-2/3">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{sailing.name ?? "Cruise title"}</h2>
            <p className="text-gray-600">{sailing.region}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span>{sailing.duration} nights</span>
              <span className="flex items-center text-yellow-500">
                <Star size={16} className="mr-1" />
                {sailing.ship.rating.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">{sailing.ship.reviews} reviews</span>
            </div>
              <p className="text-sm mt-1 text-gray-700">
                {sailing.itinerary[0].split(',')[0]} →{" "}
                {sailing.itinerary.map((city, index) => (
                  <span key={index}>
                    {city.split(',')[0]}
                    {index < sailing.itinerary.length - 1 ? " → " : ""}
                  </span>
                ))} → {sailing.itinerary[sailing.itinerary.length - 1].split(',')[0]}
              </p>
          </div>

          <div className="flex flex-col items-end text-right">
            <img src={sailing.ship.line.logo ?? "/logo.png"} alt="Logo" className="h-8 mb-2" />
            <p className="text-sm text-gray-500">{sailing.ship.name}</p>
          </div>
        </div>

        {/* Price and button */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">
            Interior from <span className="text-xl text-black font-semibold">${sailing.price}</span>
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            See sailings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CruiseCard;
