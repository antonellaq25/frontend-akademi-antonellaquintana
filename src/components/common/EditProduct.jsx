import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../store/actions/prodActions";
import { Alert, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const product = products.find((p) => p.id.toString() === id);

  const [open, setOpen] = useState(false);
  const [revertedOpen, setRevertedOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    image: "",
    category: "",
    specifications: [], 
  });

  const [initialData, setInitialData] = useState(product);

  useEffect(() => {
    if (product) {
      setFormData({ ...product, specifications: product.specifications || [] });
    } else {
      axios
        .get(`http://localhost:3001/products/${id}`)
        .then((res) => {
          const product = res.data;
          setFormData({ ...product, specifications: product.specifications || [] });
        })
        .catch((err) => console.error("Error al obtener el producto", err));
    }
  }, [product, id]);

  const handleReset = () => {
    console.log("click on handle reset")
    if (initialData) {
      console.log("hola", revertedOpen)
      setFormData(initialData);
      setRevertedOpen(true);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][field] = value;
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: "", value: "" }],
    });
  };

  const removeSpecification = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAction(id, formData));
    setOpen(true);
  };

  return (
    <div className="relative py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <Typography variant="h4" color="blue-gray">
          Edit
        </Typography>

        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Description" name="description" value={formData.description} onChange={handleChange} required />
        <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <Input label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} min="0" required />
        <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
        <Input label="Category" name="category" value={formData.category} onChange={handleChange} />
        <Input label="Image URL" name="image" value={formData.image} onChange={handleChange} />
        <Typography variant="h6" className="pt-4">Specifications</Typography>
        {formData.specifications.map((spec, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              label="Specification name"
              value={spec.key}
              onChange={(e) => handleSpecChange(index, "key", e.target.value)}
            />
            <Input
              label="Value"
              value={spec.value}
              onChange={(e) => handleSpecChange(index, "value", e.target.value)}
            />
            <Button color="red" size="sm" onClick={() => removeSpecification(index)}>
              X
            </Button>
          </div>
        ))}

        <Button color="blue" onClick={addSpecification}>
          + Add specification
        </Button>

        <div className="flex gap-4 pt-4">
          <Button type="submit" color="blue">
            Save
          </Button>
          <Button type="button" onClick={handleReset} color="gray">
            Undo
          </Button>
        </div>
      </form>

      <Alert className="absolute bottom-0 bg-green-800" open={open} onClose={() => setOpen(false)}>
      Updated product
      </Alert>
      <Alert
        className="absolute bottom-0 bg-green-800"
        open={revertedOpen}
        onClose={() => setRevertedOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Change reverted
      </Alert>
    </div>
  );
};

export default EditProduct;
