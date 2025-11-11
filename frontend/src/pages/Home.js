import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductsCard from "../components/ProductsCard";
import "./Home.css";
import Header from "../components/Header";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:8080" + `/products?${searchParams}`
        );
        const resData = await res.json();
        setProducts(resData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchParams]);

  return (
    <div className="bg-light">
      <main className="row home-main ">
        {products.map((product) => (
          <div
            className="col-sm-12 col-md-4 col-lg-3 mt-5 p-3 d-flex justify-content-center"
            key={product._id}
          >
            <div
              className="card  p-3 rounded shadow-sm bg-white rounded "
              style={{ height: "400px", width: "300px" }}
            >
              <div className="d-flex justify-content-center align-items-center">
                <Link to={"/product/" + product._id}>
                  <img
                    className="product-img "
                    src={product.images}
                    alt={product.images}
                  />
                </Link>
              </div>
              <div className="card-body d-flex flex-column position-relative">
                <Link to={"/product/" + product._id} className="product-links">
                  <h5 className="card-title text-dark">{product.name}</h5>
                </Link>
                <p className="card-text">${product.price}</p>
                <Link
                  to={"/product/" + product._id}
                  className="btn btn-warning px-5 position-absolute bottom-0 ms-4"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
