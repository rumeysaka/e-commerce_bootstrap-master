import React from "react";
import { Button, Card } from "react-bootstrap";

export default function ProductItem({ product, onAddToCart }) {

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
  }
  return (
    <>
      <Card
        className
        style={{
          width: "12rem",
          height: "100%",
          margin: "10px",
          marginBottom: "0px",
        }}
      >
        <Card.Img
          variant="top"
          src={product.image.url}
          style={{
            objectFit: "cover",
            height: "150px",
            width: "150px",
            alignSelf: "center",
          }}
        />{" "}
        <Card.Body
          style={{ alignItems: "end", paddingTop: "30px", marginBottom: "0px" }}
        >
          <div>
            <Card.Title style={{ fontSize: "18px" }}>{product.name}</Card.Title>
            <Card.Text dangerouslySetInnerHTML={{__html:product.description}} style={{fontSize:"12px"}}></Card.Text>
          </div>
          <Card.Text style={{ fontSize: "15px", float: "right", fontWeight: "500" }}>
              {product.price.formatted_with_symbol}
            </Card.Text>

        </Card.Body>
        <Button variant="light" size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card>
    </>
  );
}
