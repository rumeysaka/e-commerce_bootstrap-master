import React from "react";
import ProductItem from "./ProductItem";

export default function Products({ products, AddToCart, onHandleFav }) {
  return (
      <div className="my-4 container" style={{ display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
      {products.map((product) => (
        <div key={product.id}
        style={{marginBottom: "20px"}}>
          <ProductItem product={product} 
            handleFav={onHandleFav}
        onAddToCart={AddToCart}/>
        </div>
      ))}
    </div>
  );
}
