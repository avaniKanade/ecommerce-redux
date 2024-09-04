import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setProducts } from "../redux/store";
import { productsSelector } from "../redux/store";
import Alert from "react-bootstrap/Alert";
import ProductListItem from "./ProductListItem";
import { ShopProduct } from "../shared.types"
import Grid from '@mui/material/Grid';

const Products = () => {
  const prodList = useSelector(productsSelector);
  const [topMsg, setTopMsg] = useState("");

  const dispatch = useDispatch();

  const addProduct = (product: ShopProduct) => {
    dispatch(addToCart(product));
    setTopMsg("Product added sucessfully");
  };
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (componentMounted) {
        const listProds = await response.clone().json();
        dispatch(setProducts(listProds));
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  useEffect(() => {
    if (topMsg === "") return;
    const timeoutId = setTimeout(() => {
      setTopMsg("");
    }, 2000);
    return function cleanup() {
      clearTimeout(timeoutId);
    };
  }, [topMsg]);

  const Loading = () => {
    return <>loading........</>;
  };

  const ShowProducts = () => {
    return (
      <>
        <Alert
          variant="success"
          onClose={() => setTopMsg("")}
          show={topMsg !== ""}
          dismissible
        >
          {topMsg}
        </Alert>

        <Grid container rowSpacing={2} spacing={2}>

        {prodList.map((product: ShopProduct, id: number) => {
          return (
            <ProductListItem
              product={product}
              key={product.id}
              onAddProduct={addProduct}
            />
          );
        })}
        </Grid>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
