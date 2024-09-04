import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/store';
import { ShopProduct } from "../shared.types"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Alert from "react-bootstrap/Alert";
import ProductListItemTop from "./ProductListItemTop"

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [topMsg, setTopMsg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (topMsg === "") return;
    const timeoutId = setTimeout(() => {
      setTopMsg("");
    }, 2000);
    return function cleanup() {
      clearTimeout(timeoutId);
    };
  }, [topMsg]);


  const addProduct = (product: ShopProduct) => {
    dispatch(addToCart(product));
    setTopMsg("Product added sucessfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

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

      <Grid
        container
        justifyContent="center"
      >
        <Grid container item xs={8} md={8} >
          <Paper
            sx={{
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              height: "100%"
            }}
          >
            <ProductListItemTop product={product} isDetailPage={true} />
            <Grid spacing={2} container item sx={{ marginTop: 1 }}>
              <Grid item md={8} sx={{ border: 0 }}>
                <p>{product.description}</p>
              </Grid>
              <Grid item md={4} sx={{ border: 0 }}>
                <button className="btn btn-primary" onClick={() => addProduct(product)} >
                  Add to Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetails;
