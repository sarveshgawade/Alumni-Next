import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function EventCard({ data,isPast }) {

  const navigate = useNavigate();

  const dateObj = new Date(data?.date);

  const dayName = dateObj.toLocaleString('default', { weekday: 'long' }); 
  const year = dateObj.getFullYear();
  const monthName = dateObj.toLocaleString('default', { month: 'long' }); 
  const day = dateObj.getDate();

  const cardClass = isPast ? 'bg-gray-300' : 'bg-blue-950';
  const textColor = isPast ? 'text-black' : 'text-white';
  
  

  return (
    <div
      className="flex border rounded-lg overflow-hidden shadow-lg max-w-md transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
      onClick={() => navigate('/events/description', { state: data })}
    >
      <div className={`${cardClass} ${textColor} p-4 flex flex-col items-center justify-center w-32`}>
        <span className="text-sm">{dayName}</span>
        <span className="text-xl font-bold">{day}</span>
        <span className="text-sm">{monthName}-{year}</span>
      </div>
      
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold"> {data?.eventName}</h3>
        {/* <p className="text-sm text-gray-600">1 day event</p> */}
      </div>
    </div>
  );
}
