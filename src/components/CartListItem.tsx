import React, { useState } from 'react'
import "./style.css";
import { useDispatch } from 'react-redux'
import { removeFromCart, addToCart, decrementQuantity } from '../redux/store'
import DeleteConfirmation from './DeleteConfirmation';
import { ShopProduct } from "../shared.types"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ProductListItemTop from "./ProductListItemTop"

interface Props {
    product: ShopProduct,
}

type dialogParm = {
    isShow: boolean,
    message: string,
    nameProduct?: string
}


const CartListItem = ({ product }: Props) => {

    const dispatch = useDispatch();
    const [dialog, setDialog] = useState<dialogParm>({
        message: "",
        isShow: false,
        nameProduct: ""
    });

    const handleDelete = () => {
        //dispatch(removeFromCart(product))
        setDialog({
            message: "Are you sure you want to delete?",
            isShow: true
        })

    }

    const confirmDelete = (choice: boolean) => {
        if (choice) {
            console.log("choose", choice);
            dispatch(removeFromCart(product))

        }
        setDialog({
            isShow: false,
            message: ""
        })


    }
    const handleAdd = () => {
        dispatch(addToCart(product));
    }
    const handleDecrement = () => {
        dispatch(decrementQuantity(product))
    }

    return (
        <>
            <Grid container item xs={12} md={4}  >
                <Paper
                    sx={{
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        height: "100%"
                    }}
                >
                    <ProductListItemTop product={product} />

                    <Grid spacing={2} container item sx={{ marginTop: 1 }}>
                        <Grid item md={6} sx={{ border: 0 }}>
                            <br />
                            <button className="btn btn-primary" onClick={handleDelete} >
                                Remove
                            </button>
                            {dialog.isShow && (
                                <DeleteConfirmation
                                    onDialog={confirmDelete}
                                    message={dialog.message}
                                />
                            )}
                        </Grid>
                        <Grid style={{ textAlign: "center" }} item md={6} sx={{ border: 0 }}>
                            <button className='btn btn-primary center' onClick={handleAdd}>+</button> / <button className='btn btn-primary center' onClick={handleDecrement}>-</button><br />

                            <h5>Quantity: {product.quantity}</h5>

                            <h6>Subtotal: {product.price * product.quantity} </h6>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default CartListItem;