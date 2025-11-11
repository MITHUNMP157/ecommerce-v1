import React, { useEffect, useState } from "react";
import "./OrdersDetails.css";
import { toast } from "react-toastify";

const OrdersDetails = () => {
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    const orders = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}`);
        const resData = await res.json();
        setOrderData(resData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    orders();
  }, []);

  const cancelOrder = async (o) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/${o._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOrderData((prev) => prev.filter((order) => order._id !== o._id));
        toast.warn("Order Cancel Success");
      } else {
        console.error("Failed to cancel order");
        toast.error("Order Cancel Error");
      }
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };
  return (
    <div className="order-details-main">
      <div className="container">
        {orderData.length > 0 ? (
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="card-body bg-secondary">
                <div className="row text-light p-2">
                  <div className="col-lg-3">
                    <h3>Order Id</h3>
                  </div>
                  <div className="col-lg-1">
                    <h3>Image</h3>
                  </div>
                  <div className="col-lg-3">
                    <h3>Name</h3>
                  </div>
                  <div className="col-lg-2">
                    <h3>Price</h3>
                  </div>
                  <div className="col-lg-1">
                    <h3>Qty</h3>
                  </div>
                  <div className="col-lg-2">
                    <h3>Action</h3>
                  </div>
                </div>
              </div>
            </div>
            {orderData.map((order) => (
              <div className="col-lg-12" key={order._id}>
                <div className="card">
                  <div className="card-body">
                    <div className="row text-center d-flex align-items-center">
                      <div className="col-lg-3">
                        <h4>{`SB-${order._id.toUpperCase().slice(-10)}`}</h4>
                      </div>
                      <div className="col-lg-1">
                        <img
                          src={order.products?.images}
                          alt={order.products?.name}
                          style={{ width: "80px" }}
                        />
                      </div>
                      <div className="col-lg-3">
                        <h4>{order.products?.name}</h4>
                      </div>
                      <div className="col-lg-2">
                        <p>
                          Price :
                          <span className="text-success fs-5 fw-bold">
                            ₹{order.products?.price * order.qty}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-1">
                        <p>
                          Qty :<span className="fw-bold"> {order.qty}</span>
                        </p>
                      </div>
                      <div className="col-lg-2">
                        <button
                          className="btn btn-danger"
                          size="sm"
                          onClick={() => cancelOrder(order)}
                        >
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <div className="text-center bg-light p-5 rounded-4 shadow">
              <div className="display-3 mb-3">🛍️</div>
              <h2 className="text-secondary fw-bold">No Orders Placed</h2>
              <p className="text-muted">You haven’t placed any orders yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersDetails;
