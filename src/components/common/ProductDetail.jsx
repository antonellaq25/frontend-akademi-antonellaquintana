import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteProductAction } from "../../store/actions/prodActions";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
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
    return <p>Product not found</p>;
  }

  const handleEdit = () => navigate(`/edit/${id}`);

  const handleDelete = () => {
    dispatch(deleteProductAction(product.id));
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1 className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
          style={{ fontFamily: "'Open Sans', 'sans-serif'" }}
        >
          Product Details
        </h1>
      </div>
      <div className="p-6 mt-6 flex justify-center">
        <Card className="max-w-xl">
          <CardHeader>
            <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
          </CardHeader>
          <CardBody>
            <Typography variant="h4">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Stock: {product.stock}</Typography>
            <Typography variant="h6" color="green">${product.price}</Typography>

            <div className="mt-4">
              <Typography variant="h5" className="mb-2">Specifications</Typography>
              {product.specifications.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {product.specifications.map((spec, index) => (
                    <li key={index}>
                      <Typography>
                        <strong className="capitalize">{spec.key}:</strong> {spec.value}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography color="gray">No specifications available</Typography>
              )}

              <div className="flex gap-4 pt-4">
                <Button onClick={handleEdit} variant="small" color="blue" className="p-2 font-medium">
                  Edit
                </Button>
                <Button onClick={() => setOpen(true)} variant="small" color="black" className="p-2 font-medium">
                  Delete
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={open} handler={() => setOpen(!open)}>
        <DialogHeader>Confirm Action</DialogHeader>
        <DialogBody>
          Are you sure you want to delete? This action cannot be undone.
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
