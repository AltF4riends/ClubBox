import tngWallet from '../PaymentPage/paymentImage/tngEWallet.png'
import pP from '../PaymentPage/paymentImage/PayPal-Logo-PNG-Picture.png'
import cC from '../PaymentPage/paymentImage/credit-card-logo-black-3.png'
import fpX from '../PaymentPage/paymentImage/fpx-gateway-icon.png'

import React, { useEffect, useState } from 'react'
import {
  CardElement, 
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { ConfigProvider, Radio } from 'antd'
import { Flex, Segmented } from 'antd';

import { getApp } from "@firebase/app";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { getProducts } from "@stripe/firestore-stripe-payments";

const PayPageOverview = () => {

  // const stripe = useStripe();
  // const elements = useElements();

  // const [message, setMessage] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!stripe) {
  //     return;
  //   }

  //   const clientSecret = new URLSearchParams(window.location.search).get(
  //     "payment_intent_client_secret"
  //   );

  //   if (!clientSecret) {
  //     return;
  //   }

  //   stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
  //     switch (paymentIntent.status) {
  //       case "succeeded":
  //         setMessage("Payment succeeded!");
  //         break;
  //       case "processing":
  //         setMessage("Your payment is processing.");
  //         break;
  //       case "requires_payment_method":
  //         setMessage("Your payment was not successful, please try again.");
  //         break;
  //       default:
  //         setMessage("Something went wrong.");
  //         break;
  //     }
  //   });
  // }, [stripe]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!stripe || !elements) {
  //     // Stripe.js hasn't yet loaded.
  //     // Make sure to disable form submission until Stripe.js has loaded.
  //     return;
  //   }

  //   setIsLoading(true);

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     confirmParams: {
  //       // Make sure to change this to your payment completion page
  //       return_url: "http://localhost:3000",
  //     },
  //   });

  //   // This point will only be reached if there is an immediate error when
  //   // confirming the payment. Otherwise, your customer will be redirected to
  //   // your `return_url`. For some payment methods like iDEAL, your customer will
  //   // be redirected to an intermediate site first to authorize the payment, then
  //   // redirected to the `return_url`.
  //   if (error.type === "card_error" || error.type === "validation_error") {
  //     setMessage(error.message);
  //   } else {
  //     setMessage("An unexpected error occurred.");
  //   }

  //   setIsLoading(false);
  // };

  const handleCheckOut = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: [
          {id: 1, quantity: 3},
          {id: 2, quantity: 1},
    ]
    }),
      })
      .then((res) => {
          if(res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
      })
      .then(({url}) => {
          window.location = url; //maybe some sort of redirect
      })
      .catch(e => {
          console.error(e.error)
      });
  }

  return (
    <div>
        <div style={{
          display: "flex",
          height: "87vh",
          width: "100vw",
          backgroundColor: "rgba(153,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center",
        }}>

          <form onSubmit={handleCheckOut}>
          <div style={{
              display: "flex",
              height: "80vh",
              width: "85vw",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "45px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <div style={{
                display: "flex",
                height: "75vh",
                width: "50vw",
                backgroundColor: "rgba(255,0,0,0.7)",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom: "solid grey 1px"
              }}>
                {/*Bank Stuff I assume*/}
                
              </div>

              <div style={{
                display: "flex",
                height: "75vh",
                width: "33vw",
                backgroundColor: "rgba(0,0,255,0.7)",
                borderLeft: "solid grey 1px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <div style={{height: "7vh", width:"28vw", borderBottom: "solid grey 1px"}}><h1>Price Details</h1></div> {/*Inner Title*/}

                <div style={{height: "30vh", width:"28vw", borderBottom: "solid grey 1px"}}> {/*Inner Arraying Payment*/}
                  Array Stuff
                </div>

                <div style={{height: "5vh", width:"28vw", borderBottom: "solid grey 1px"}}>
                  <h3>Total Payment: </h3> {/*Inner Arraying Total*/}
                </div>

                <div style={{display: "flex", height: "20vh", width:"28vw", justifyContent: "center", alignItems: "center",}}> {/*Inner Submit Button*/}
                <button type="submit">Pay</button> {/*disabled={isLoading || !stripe || !elements}*/}
                </div>
              </div>
            
            </div> {/*Inner White*/}

          </form>

        </div>
    </div>
  )
}

export default PayPageOverview