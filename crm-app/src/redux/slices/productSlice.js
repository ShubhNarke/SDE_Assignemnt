import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products');
  return response.data.products;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('https://dummyjson.com/products/add', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }) => {
  const response = await axios.put(`https://dummyjson.com/products/${id}`, data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://dummyjson.com/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;