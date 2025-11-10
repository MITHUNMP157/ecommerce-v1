import React from "react";

const ProductsCard = ({ product }) => {
  return (
    <div>
      <div className="col-sm-12 mt-3">
        <div className="card  p-3 rounded">
          <img className="card-img-top" src={product.images[0].image} />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.name}</h5>
            <div className="card-text">${product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
