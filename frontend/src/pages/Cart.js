import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Cart.css";

const Cart = ({ cartItem, setCartItem }) => {
  const [complete, setComplete] = useState(false);
  const increaseQty = (item) => {
    if (item.products.stock == item.qty) {
      return;
    }

    const updatedItems = cartItem.map((i) => {
      if (i.products._id == item.products._id) {
        i.qty++;
      }
      return i;
    });
    setCartItem(updatedItems);
  };
  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedItems = cartItem.map((i) => {
        if (i.products._id == item.products._id) {
          i.qty--;
        }
        return i;
      });
      setCartItem(updatedItems);
    }
  };

  const removeCartItems = (item) => {
    const updatedItems = cartItem.filter((i) => {
      return i.products._id !== item.products._id;
    });
    toast.error("Product has removed");
    setCartItem(updatedItems);
  };
  const addToCart = async (orderedItems) => {
    try {
      const res = await fetch("http://localhost:8080/addcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderedItems }),
      });
      console.log({ orderedItems });
      if (res.ok) {
        toast.success("Order placed successfully!");
        setCartItem([]);
        setComplete(true);
      } else {
        toast.error("Failed to place order");
        console.log(res);
      }
    } catch (error) {
      toast.error("Order placement error");
      console.error(error);
    }
  };
  return (
    <div className="container cart-main">
      {cartItem.length > 0 ? (
        <div className="row my-3">
          <p className="text-center display-6">
            Your Cart : <strong>{cartItem.length} items</strong>
          </p>
          <div className="row d-flex justify-content-between">
            <div className="col-sm-12 col-lg-9">
              <hr />
              {cartItem.map((item) => (
                <div className="row d-flex justify-content-between align-item-center">
                  <div className="col-sm-12 col-md-2 col-lg-2 ms-4 d-flex justify-content-center align-items-center">
                    <img
                      src={item.products.images}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col-sm-12 col-md-2 col-lg-2 text-secondary fw-bold d-flex justify-content-center align-items-center">
                    {item.products.name}
                  </div>
                  <div className="col-sm-12 col-md-2 col-lg-2 text-warning fw-bold d-flex justify-content-center align-items-center">
                    ${item.products.price}
                  </div>
                  <div className="col-sm-12 col-md-2 col-lg-2 d-flex justify-content-center align-items-center">
                    <div className="row">
                      <div className="col">
                        <button
                          className="d-inline btn btn-danger me-3"
                          onClick={() => {
                            decreaseQty(item);
                          }}
                        >
                          -
                        </button>
                        <p className="d-inline">{item.qty}</p>
                        <button
                          className="btn btn-primary ms-3"
                          onClick={() => {
                            increaseQty(item);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2 col-lg-2 d-flex justify-content-center align-items-center">
                    <span
                      className="material-symbols-outlined text-danger d-block"
                      role="button"
                      onClick={() => {
                        removeCartItems(item);
                      }}
                    >
                      delete
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-sm-11 col-lg-2 border border-rounded ms-2 mt-3"
              style={{ height: "250px", width: "250px" }}
            >
              <br />
              <div>
                <div className="text-center fw-bold">Order Summary</div>
                <hr />
                <div>
                  <p className="d-flex justify-content-evenly">
                    Subtotal:
                    <span className="ms-2 fw-bold">
                      {cartItem.reduce((acc, item) => acc + item.qty, 0)}
                      (Units)
                    </span>
                  </p>
                  <p className="d-flex justify-content-evenly">
                    Total Value:
                    <span className="ms-2 fw-bold">
                      $
                      {Number(
                        cartItem.reduce(
                          (acc, item) => acc + item.products.price * item.qty,
                          0
                        )
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
                <hr />
                <div className="text-center">
                  <button
                    className="btn btn-warning rounded-pill w-100 text-white fw-bold"
                    onClick={() => {
                      addToCart(cartItem);
                    }}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : !complete ? (
        <h2 className="my-5 text-center">Your Cart is Empty!</h2>
      ) : (
        <div className="text-center">
          <h2 className="mt-5">Order Complete!</h2>
          <p>Your order has been placed succesfully.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
