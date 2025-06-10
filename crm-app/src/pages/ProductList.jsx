import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addProduct(newProduct));
    setNewProduct({ title: '', price: '' });
  };

  const handleUpdate = (id) => {
    const updated = prompt('Enter new title:');
    if (updated) dispatch(updateProduct({ id, data: { title: updated } }));
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h2>Product List</h2>
      <input
        placeholder="Title"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={handleAdd}>Add Product</button>
      {products.map((product) => (
        <div key={product.id}>
          {product.title} - ${product.price}
          <button onClick={() => handleUpdate(product.id)}>Update</button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;