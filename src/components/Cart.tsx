import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cartSelector, clearCart } from '../redux/store'
import "./style.css";
import CartListItem from './CartListItem';
import EmptyCart from './EmptyCart';
import TotalAmount from './TotalAmount';
import Alert from 'react-bootstrap/Alert'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Cart = () => {
    const [topMsg, setTopMsg] = useState("");
    const cart = useSelector(cartSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (topMsg === "")
            return;
        const timeoutId = setTimeout(() => {
            setTopMsg("");
        }, 2000);
        return function cleanup() {
            clearTimeout(timeoutId);
        }
    }, [topMsg]);

    const handleOnPay = () => {
        dispatch(clearCart());  // Remove the empty object {}
        setTopMsg("Order placed successfully. Thank you for shopping with us.");
    };
    

    return (
        <>
            <Alert variant="success" onClose={() => setTopMsg("")} show={topMsg !== ""} dismissible>{topMsg}</Alert>
            {cart.length === 0 && <EmptyCart />}
            {cart.length !== 0 &&
                <>
                    <Paper
                        sx={{
                            p: 1,
                            m: 1,
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            height: "100%"
                        }}
                    >
                        <h3>Shopping Cart</h3>
                        <Grid container rowSpacing={2} spacing={2}>
                            {cart.map((product: any, id: any) =>
                                <CartListItem product={product} key={id} />
                            )}
                        </Grid>
                        <TotalAmount onHandlePay={handleOnPay} />
                    </Paper>
                </>
            }
        </>);
}

export default Cart;