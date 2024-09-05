import React from "react";
import { ShopProduct } from "../shared.types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ProductListItemTop from "./ProductListItemTop";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/store";

// type AddProduct = (product: ShopProduct) => void;

interface Props {
  product: ShopProduct;
  onSetTopMsg: (msg: string) => void;
}

function ProductListItem({ product, onSetTopMsg }: Props) {
  const dispatch = useDispatch();

  const addProduct = (product: ShopProduct) => {
    dispatch(addToCart(product));
    onSetTopMsg("Product added sucessfully");
  };

  return (
    <>
      <Grid container item xs={12} md={4}>
        <Paper
          sx={{
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            height: "100%",
          }}
        >
          <ProductListItemTop product={product} />

          <Grid spacing={2} container item sx={{ marginTop: 1 }}>
            <Grid item md={8} sx={{ border: 0 }}>
              <p className="text-ellip3">{product.description}</p>
            </Grid>
            <Grid item md={4} sx={{ border: 0 }}>
              <button
                className="btn btn-primary"
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default ProductListItem;
