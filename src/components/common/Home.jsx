import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductAction } from "../../store/actions/prodActions";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

const productsPerPage = 4;

const Home = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const { products = [], loading, error } = useSelector(state => state.product);
  const { filteredProductsFromState } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  let filteredProducts = [];

  if (filteredProductsFromState?.length > 0) {
    filteredProducts = filteredProductsFromState;
  } else {
    filteredProducts = categoryName
      ? products.filter(product =>
        product.category.toLowerCase() === categoryName.toLowerCase()
      )
      : products;
  }
  const sortProducts = (products) => {
    switch (sortOrder) {
      case "name-asc":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };
  const sortedProducts = sortProducts(filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <h1 className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl">
        {categoryName
          ? `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`
          : "Find state of the art products"}
      </h1>
      <div className="flex justify-end">
        <div className="px-6 pb-4  w-72">
          <Select
            label="Sort by"
            value={sortOrder}
            onChange={(value) => setSortOrder(value)}>
            <Option value="">Featured</Option>
            <Option value="name-asc">Name (A-Z)</Option>
            <Option value="name-desc">Name (Z-A)</Option>
            <Option value="price-asc">Price (Low to High)</Option>
            <Option value="price-desc">Price (High to Low)</Option>
          </Select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center p-6">
          <Typography variant="h5" color="blue-gray">
            No products found in this category
          </Typography>
        </div>
      ) : (
        <div className="flex flex-col-4 justify-center gap-6 p-6">
          {currentProducts.map(product => (
            <Card key={product.id} className="mt-4 gap-1 w-96 hover:scale-90 hover:shadow-gray-600 transition duration-300 ease-in-out">
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {product.name}
                </Typography>
                <Typography>{product.description}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Typography variant="h6" color="green">
                  ${product.price}
                </Typography>
                <Button onClick={() => navigate(`/product/${product.id}`)}>
                  Find out more
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6 gap-4">
        <Button onClick={prevPage} disabled={currentPage === 1}>Prev</Button>
        <Typography variant="h6">
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </Typography>

        <Button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredProducts.length / productsPerPage)}>Next</Button>
      </div>
    </div>
  );
};

export default Home;
