import React from "react";
import { useEffect } from "react";
import { getProductAction } from "../../store/actions/prodActions"
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Home = () => {
  console.log("home mostrandose");
  const { products = [], loading, error } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("probando accion");
    dispatch(getProductAction())
  }, [dispatch]);

  if (loading) return <p>Cargando productos</p>;
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1
        className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
        style={{ fontFamily: "'Open Sans', 'sans-serif'" }}
      >
       Find state of the art products 
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
        {products.map(product =>
          <Card key={product.id} className="mt-4 gap-1 w-96 hover:scale-90  hover:shadow-gray-600 transition duration-300 ease-in-out">
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {product.name}
              </Typography>
              <Typography>
                {product.description}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography variant="h6" color="green">
                ${product.price}
              </Typography>
              <Button>Find out more</Button>
            </CardFooter>
          </Card>)}

      </div>
    </div>


  );
}


export default Home;