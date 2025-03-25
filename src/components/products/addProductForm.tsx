import React, { useState } from "react";

interface AddProductFormProps {
  name: string;
  description: string;
  price: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  name,
  description,
  price,
  setName,
  setDescription,
  setPrice,
}) => {
  return (
    <form className="product-form">
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter product price"
          required
        />
      </div>
    </form>
  );
};

export default AddProductForm;
