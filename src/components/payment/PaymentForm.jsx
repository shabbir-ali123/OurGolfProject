import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripe = require("stripe")("sk_test_51PBH1RGfCaPJBtru0fuyrSojJ8nlHs9Vnufmi2JPk5BbxsiYPo4wyX7qW0lP8OvlzTsVxv9BlTeXMzZOPL2UxDJi00S166RaoB");

const CheckoutForm = () => {



  
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    // const stripe = await loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
  
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // };
  
    try {
    //   const response = await axios.post(
    //     "http://localhost:5000/api/checkout-event",
    //     { eventName: "event.id" },
    //     { headers }
    //   );
     
    //   const session = response.data;
  
    //   const result = stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   });
  
    //   if (result.error) {
    //     console.log(result.error, 'failed to call stripe api');
    //   }
    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "asdasd", // Assuming eventName is sent in the request body
          },
          unit_amount: 2000, // Price in cents ($20 * 100)
        },
        quantity: 12,
      }
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancel',
    });
    
    window.location.href = session.url;
    
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  


  return (
    <div className="mx-4 relative h-[72vh] flex justify-center items-center overflow-hidden z-0">
      <h2>Checkout</h2>
   
      <form onSubmit={handleCheckout}>
        {/* Form inputs for collecting order details */}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
