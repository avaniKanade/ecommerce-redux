
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function EmptyCart({ isShowSuccess = false }) {
  return (
    <>
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyCart