import React from 'react'
import { cartTotalSelector } from '../redux/store'
import { useSelector } from 'react-redux'
import { Button } from "react-bootstrap";
import Paper from '@mui/material/Paper';

type HandlePayment = () => void;

interface Props {
  onHandlePay: HandlePayment,
}

function TotalAmount({ onHandlePay }: Props) {
  const itemTotal = useSelector(cartTotalSelector);

  return (
    <>
      <Paper
        sx={{
          p: 1,
          m: 4,
          bgcolor: 'background.paper',
          borderRadius: 1,
          height: "100%",
          textAlign: "right"
        }}
      >
        <h5>Total: $ {itemTotal}</h5>
        <div>
          <Button className="mt-9 w-100 primary" onClick={() => onHandlePay()}>
            Proceed to Buy
          </Button>

        </div>
      </Paper>
    </>
  );
}



export default TotalAmount