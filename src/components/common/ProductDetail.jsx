import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, Card, CardBody, CardHeader } from "@material-tailwind/react";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useSelector(state => state.product);
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <div>
      <div>
        <h1
          className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Open Sans', 'sans-serif'" }}
        > Product Details</h1>
      </div>
      <div className="p-6 mt-6 flex justify-center">
        <Card className="max-w-xl">
          <CardHeader>
            <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
          </CardHeader>
          <CardBody>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Stock:{product.stock}</Typography>
            <Typography variant="h6" color="green">${product.price}</Typography>
            <div className="mt-4">
              <Typography variant="h5" className="mb-2">Specifications</Typography>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <Typography>
                      <strong className="capitalize">{key}:</strong> {value}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
export default ProductDetail;