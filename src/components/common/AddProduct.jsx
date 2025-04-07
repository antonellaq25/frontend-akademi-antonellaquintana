import React, { useState } from "react";
import { Button, Input, Typography, Alert} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addProductsAction } from "../../store/actions/prodActions";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
    description: "",
    specifications: [],
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
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
    if (formData.price < 0 || formData.stock < 0) {
      setErrors({
        price: formData.price < 0 ? "Must be 0 or greater" : "",
        stock: formData.stock < 0 ? "Must be 0 or greater" : "",
      });
      return;
    }

    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
    };

    dispatch(addProductsAction(newProduct));
    setOpen(true);

    setFormData({
      name: "",
      category: "",
      brand: "",
      price: "",
      stock: "",
      image: "",
      description: "",
      specifications: [],
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Typography className="text-blue-gray-500 relative h-40 flex justify-center items-center text-center font-sans md:text-4xl lg:text-5xl"
      style={{ fontFamily: "'Open Sans', 'sans-serif'" }}>
        Add new product
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} required/>
          <Input label="Category" name="category" value={formData.category} onChange={handleChange} required/>
          <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} required />
          <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} required/>
          <Input label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange}  required/>
          <Input label="Imagen (URL)" name="image" value={formData.image} onChange={handleChange} required/>
        </div>

        <Input label="Description" name="description" value={formData.description} onChange={handleChange} />

        <Typography variant="h5" className="font-bold mt-6">
          Specifications
        </Typography>
        {formData.specifications.map((spec, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              label="Specification Name"
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
          + Add Specification
        </Button>

        <div className="flex justify-end mt-4">
          <Button type="submit" color="green">
            Save Product
          </Button>
        </div>
      </form>
      <div className="w-full">
      <Alert
        className="absolute bottom-0 bg-green-800"
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
       Product Added
      </Alert>
      </div>
    </div>
    
  );
};

export default AddProduct;
