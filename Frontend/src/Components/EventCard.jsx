import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function EventCard({ data }) {

  const navigate = useNavigate();

  return (
      <Card 
        className="max-w-[24rem] h-full flex flex-col justify-between overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border border-gray-300 rounded-lg"
        onClick={()=> navigate('/events/description',{state: data})}
      >
          <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none h-56"
          >
              <img
                  src={data?.thumbnail?.secure_url}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
              />
          </CardHeader>
          <CardBody className="flex-grow">
              {/* Truncate event name if too long */}
              <Typography 
                variant="h4" 
                className="text-yellow-500 whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ maxWidth: '100%' }}
              >
                  {data?.eventName}
              </Typography>

              {/* Truncate tagline if too long */}
              <Typography 
                variant="lead" 
                color="gray" 
                className="mt-3 font-normal whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ maxWidth: '100%' }}
              >
                  {data?.tagline}
              </Typography>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
              <Typography className="font-normal">{data?.date}</Typography>
          </CardFooter>
      </Card>
  );
}
