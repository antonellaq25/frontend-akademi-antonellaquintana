import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Home = () => {
  return (
    <div>
      <h1
        className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
        style={{ fontFamily: "'Open Sans', 'sans-serif'" }}
      >
        Encontra los mejores productos
      </h1>
      <Card className="mt-4 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src=""
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Ejemplo de producto
          </Typography>
          <Typography>

          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Ver mas detalles</Button>
        </CardFooter>
      </Card>
    </div>


  );
}


export default Home;