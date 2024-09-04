import React from 'react'
import { ShopProduct } from "../shared.types"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import clsx from 'clsx'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface Props {
  product: ShopProduct,
  isDetailPage?: boolean
}

function ProductListItemTop({ product, isDetailPage = false }: Props) {

  const imageHeight = isDetailPage ? 200 : 120;

  const linkClass = clsx({
    "disabled-link": isDetailPage,
  })

  return (
    <>
      <Link className={linkClass} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: "black" }}>
        <Grid spacing={2} container item>
          <Grid item md={4} sx={{ border: 0, maxHeight: imageHeight }} >
            <Img alt={product.title} src={product.image} />
          </Grid>
          <Grid container item md={8} sx={{ border: 0 }} direction="column" justifyContent="center">
            <Grid style={{ textAlign: "center" }} >
              <Tooltip title={product.title}>
                <h5 className="text-ellip2">{product.title}</h5>
              </Tooltip>
              <h5>${product.price}</h5>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </>
  );

}


export default ProductListItemTop