import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = ({ cartItem, setCartItem }) => {
  const [products, setProducts] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const productDetails = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/product/${id}`);
        const resData = await res.json();
        setProducts(resData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    productDetails();
  }, [id]);

  const qtyIncrease = () => {
    if (products.stock === qty) {
      return;
    }
    setQty((state) => state + 1);
  };

  const qtyDecrease = () => {
    if (qty > 1) {
      setQty((state) => state - 1);
      return;
    }
  };

  const addToCart = () => {
    const itemExist = cartItem.find(
      (item) => item.products._id == products._id
    );
    if (!itemExist) {
      const newItem = { products, qty };
      setCartItem((product) => [...product, newItem]);
      toast.success("Cart item added successfully");
    } else {
      toast.warn("Item already added");
    }
  };

  return (
    products && (
      <div className="" style={{ marginTop: "150px" }}>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-6 my-2 ">
              <img
                className="img-fluid rounded "
                src={products.images}
                alt={products.images}
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            </div>
            <div className="col-sm-6 mt-5 text-center">
              <h2 className="text-secondary">{products.name}</h2>
              <p className="text-secondary">Product #{products._id}</p>
              <hr />
              <p className="text-center fs-5">
                <strong>${products.price}</strong>
              </p>
              <div className="row">
                <div className="col mb-2">
                  <button
                    className="btn btn-danger me-3"
                    onClick={qtyDecrease}
                    disabled={products.stock === 0}
                  >
                    -
                  </button>
                  <p className="d-inline">{qty}</p>
                  <button
                    className="btn btn-primary ms-3"
                    onClick={qtyIncrease}
                    disabled={products.stock === 0}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning ms-5 border border-rounded"
                    onClick={addToCart}
                    disabled={products.stock === 0}
                  >
                    Add to cart
                  </button>
                </div>
                <br />
                <br />
                <hr />
                <div className="col">
                  <p>
                    Status:
                    <strong
                      className={
                        products.stock > 0 ? "text-success" : "text-danger"
                      }
                    >
                      {products.stock > 0
                        ? ` In Stock (${products.stock})`
                        : " Out of Stock"}
                    </strong>
                  </p>
                </div>
                <br />
                <br />
                <hr />
                <div className="row">
                  <div className="col-12">Description:</div>
                  <div className="col">{products.description}</div>
                </div>
              </div>
              <br />
              <hr />
              <div className="text-center">
                <p>
                  Sold by:
                  <strong className="ms-2">{products.seller}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
