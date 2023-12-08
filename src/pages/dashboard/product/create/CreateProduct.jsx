import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import c from './Product.module.scss';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  function createProduct(e) {
    e.preventDefault();

    const headers = { 'x-auth-token': localStorage.getItem('token') };

    axios
      .post('https://api.ricoin.uz/api/products', {
        name,
        price,
        description,
        image,
      }, {
        headers, // Include headers in the request
      })
      .then((response) => 
      {
        if(response.status === 200) {
        alert("Product created")
        window.location.reload();
      }}
      )
      .catch((err) => {
        console.log(err);
        if(err.response.status === 401) {
          alert("You are not an admin")
          window.location.reload();
        }
      });
  }

  return (
    <div>
      <form onSubmit={createProduct} className={c.product__form}>
        <input required type="text" placeholder="Product Name..." onChange={(e) => setName(e.target.value)} />
        <input required type="number" placeholder="Product Price..." onChange={(e) => setPrice(e.target.value)} />
        <input required type="text" placeholder="Product Description..." onChange={(e) => setDescription(e.target.value)} />
        <input required type="text" placeholder="Product Image..."  onChange={(e) => setImage(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateProduct
