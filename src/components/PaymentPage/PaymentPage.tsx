import React from 'react'
import NavBar from '../HomePage/NavBar'
import Footer from '../HomePage/Footer'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PayPageOverview from './PayPageOverview';

const stripePromise = loadStripe('pk_test_51OTgW5Iem9Mq2DarsFqcP0crNRCAg04GqkR27c66esWNICld6gUQQA9lxOXgeEM33A9DmjbBZTh7nXhGeycB4fD700WZnBiPoU');

const PaymentPage = () => {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };// Purely Optional

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
      <NavBar/>
      <PayPageOverview/>
      <Footer/>
      </Elements>
    </div>
  )
}

export default PaymentPage