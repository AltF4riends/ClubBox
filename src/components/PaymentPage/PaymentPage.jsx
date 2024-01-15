import React, { useEffect, useState } from 'react'
import NavBar from '../HomePage/NavBar'
import Footer from '../HomePage/Footer'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PayPageOverview from './PayPageOverview';

const stripePromise = loadStripe('pk_test_51OTgW5Iem9Mq2DarsFqcP0crNRCAg04GqkR27c66esWNICld6gUQQA9lxOXgeEM33A9DmjbBZTh7nXhGeycB4fD700WZnBiPoU');

const PaymentPage = () => {

  const [clientSecret, setClientSecret] = useState("");

  //Maybe use this as a function to create the session
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    console.log("Getting Client Sercet");
    fetch("/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>

        <NavBar/>
        <PayPageOverview/>
        <Footer/>
      
    </div>
  )
}

export default PaymentPage