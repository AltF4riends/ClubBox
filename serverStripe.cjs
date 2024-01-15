// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
//('sk_test_51OTgW5Iem9Mq2DarOKwLGUENVRfjj6NKu4jiiCDMk7Fl5PVfYepNDA6MEksyjHsqbPEtLoZeKDqiYTQavOzz2JW200fFHqzCkP')

const express = require('express');
const app = express();
const port = 4242; //change this to 5713 if can cuz server and client on one url

app.use(express.json());
app.use(express.static('src')); //Where the client will be

const YOUR_DOMAIN = 'http://localhost:5173';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: 'price_1OYUQdIem9Mq2DarbC3aVUIX',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });


app.listen(port, () => console.log('Running on port ' + port));