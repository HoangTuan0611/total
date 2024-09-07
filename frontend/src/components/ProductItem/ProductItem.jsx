import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

const ProductItem = ({product }) => {

  return (
    <a key={product.id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={
            product.image != null
              ? `http://localhost:4000/images/${product.image}`
              : 'http://localhost:4000/images/default_product.jpg'
          } 
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
    </a>
  );
}

export default ProductItem
