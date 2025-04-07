import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductAction } from "../../store/actions/prodActions";
import {
  Typography,
  Card,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const productFromState = products.find(p => p.id.toString() === id);

  const [product, setProduct] = useState(productFromState || null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (!productFromState) {
      axios.get(`http://localhost:3001/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Error fetching product:", err));
    }
  }, [productFromState, id]);

  if (!product) {
    return <div className="flex justify-center items-center h-64">
      <Typography variant="h5" color="blue-gray">Loading product...</Typography>
    </div>;
  }

  const handleEdit = () => navigate(`/edit/${id}`);

  const handleDelete = () => {
    dispatch(deleteProductAction(product.id));
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="text-blue-gray-600 hover:text-blue-500">Home</a>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-blue-gray-400">/</span>
              <span className="text-blue-gray-500">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <Card className="overflow-hidden shadow-md">
            <img 
              src={product.image } 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </Card>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-4">
            <Typography variant="h2" className="font-bold text-blue-gray-900">
              {product.name}
            </Typography>
            <Typography variant="h3" className="font-bold text-blue-gray-900 mt-2">
              ${product.price}
            </Typography>
          </div>

          <Typography color="blue-gray" className="mb-6">
            {product.description || "There's nothing I really wanted to do in life that I wasn't able to get good at. That's my skill. I'm not really specifically talented at anything except for the ability to learn."}
          </Typography>

          <div className="mb-4">
            <Typography variant="h6" color={product.stock > 0 ? "green" : "red"}>
              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
            </Typography>
          </div>

         
          {product.specifications && (
            <div className="flex gap-4 mt-6">
              <Button onClick={handleEdit} variant="outlined" color="blue" size="sm">
                Edit Product
              </Button>
              <Button onClick={() => setOpen(true)} variant="outlined" color="red" size="sm">
                Delete Product
              </Button>
            </div>
          )}
        </div>
      </div>

      {product.specifications && product.specifications.length > 0 && (
        <div className="mt-16">
          <Typography variant="h4" className="mb-4">
            Product Specifications
          </Typography>
          <Card>
            <CardBody>
              <ul className="list-disc space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <Typography>
                      <strong className="capitalize">{spec.key}:</strong> {spec.value}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>
      )}

      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Confirm Action</DialogHeader>
        <DialogBody>
          Are you sure you want to delete {product.name}? This action cannot be undone.
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="gray" onClick={() => setOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button variant="gradient" color="red" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProductDetail;