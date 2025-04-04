import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../store/actions/prodActions";
import { Alert, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const product = products.find(p => p.id.toString() === id);
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
    specifications: {
      processor: "",
      memory: "",
      storage: "",
      display: "",
      operatingSystem: ""
    }
  });

  const [initialData, setInitialData] = useState(product);


  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      axios.get(`http://localhost:3001/products/${id}`)
        .then(res => {
          const product = res.data;
          setFormData({ ...product });
        })
        .catch(err => console.error("Error al obtener el producto", err));
    }
  }, [product, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInitialData(initialData);

  };

  const handleReset = () => {
    console.log("click on handle reset")
    if (initialData) {
      console.log("hola", revertedOpen)
      setFormData(initialData);
      setRevertedOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("ID a actualizar:", id);
      console.log("Datos del producto:", formData);
      dispatch(updateProductAction(id, formData));
      setOpen(true);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };
  return (
    <div className="relative py-10">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <Typography variant="h4" color="blue-gray">
          Editar producto
        </Typography>

        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Precio"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <Input
          label="Marca"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <Input
          label="Categoría"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <Input
          label="URL de imagen"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <Typography variant="h6" className="pt-4">Especificaciones</Typography>

        <Input
          label="Procesador"
          name="processor"
          value={formData.specifications?.processor || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                processor: e.target.value
              }
            })
          }
        />

        <Input
          label="Memoria"
          name="memory"
          value={formData.specifications?.memory || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                memory: e.target.value
              }
            })
          }
        />

        <Input
          label="Almacenamiento"
          name="storage"
          value={formData.specifications?.storage || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                storage: e.target.value
              }
            })
          }
        />

        <Input
          label="Pantalla"
          name="display"
          value={formData.specifications?.display || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                display: e.target.value
              }
            })
          }
        />

        <Input
          label="Sistema Operativo"
          name="operatingSystem"
          value={formData.specifications?.operatingSystem || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                operatingSystem: e.target.value
              }
            })
          }
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" color="blue">
            Save
          </Button>
          <Button type="button" onClick={handleReset} color="gray">
            Undo
          </Button>
        </div>
      </form>
      <Alert
        className="absolute bottom-0 bg-green-800"
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        Product updated
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
