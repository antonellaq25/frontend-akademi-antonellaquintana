import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../store/actions/prodActions";
import { Alert, Button } from "@material-tailwind/react";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div>
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Editar producto</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <br />

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <br />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Precio"
        required
      />
      <br />

      <input
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <br />

      <input
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        placeholder="Marca"
      />
      <br />

      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Categoría"
      />
      <br />

      <input
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="URL de imagen"
      />
      <br />

      <h4>Especificaciones</h4>

      <input
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
        placeholder="Procesador"
      />
      <br />

      <input
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
        placeholder="Memoria"
      />
      <br />

      <input
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
        placeholder="Almacenamiento"
      />
      <br />

      <input
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
        placeholder="Pantalla"
      />
      <br />

      <input
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
        placeholder="Sistema Operativo"
      />
      <br />

      <button type="submit">Guardar</button>
      <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
        Deshacer cambios
      </button>
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
