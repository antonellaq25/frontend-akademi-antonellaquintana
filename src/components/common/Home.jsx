import React, { useState } from "react";
import { useEffect } from "react";
import { getProductAction } from "../../store/actions/prodActions"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const productsPerPage = 4;

const Home = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  console.log("home mostrandose");
  const { products = [], loading, error } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("probando accion");
    dispatch(getProductAction())
  }, [dispatch]);

  const filteredProducts = categoryName
    ? products.filter(product =>
      product.category.toLowerCase() === categoryName.toLowerCase()
    )
    : products;

  if (loading) return <p>Cargando productos</p>;
  if (error) return <p>Error: {error}</p>

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1)
    };
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1
        className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
        style={{ fontFamily: "'Open Sans', 'sans-serif'" }}
      >
        {categoryName
          ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`
          : "Find state of the art products"}
      </h1>
      {filteredProducts.length === 0 ? (
        <div className="text-center p-6">
          <Typography variant="h5" color="blue-gray">
            No products found in this category
          </Typography>
        </div>
      ) : (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 ">
        {currentProducts.map(product =>
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
              <Button onClick={() => navigate(`/product/${product.id}`)}>Find out more</Button>
            </CardFooter>
          </Card>)}
      </div>
      )}
      <div className="flex justify-center mt-6 gap-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </Button>
        <Typography variant="h6">Page {currentPage} of {Math.ceil(products.length / productsPerPage)}</Typography>
        <Button onClick={nextPage} disabled={currentPage >= Math.ceil(products.length / productsPerPage)}>
          Next
        </Button>
      </div>
    </div>

  );
};

export default Home;