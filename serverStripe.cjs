// This is your test secret API key.

//('sk_test_51OTgW5Iem9Mq2DarOKwLGUENVRfjj6NKu4jiiCDMk7Fl5PVfYepNDA6MEksyjHsqbPEtLoZeKDqiYTQavOzz2JW200fFHqzCkP')
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000; //change this to 5713 if can cuz server and client on one url

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', //where to accept things from
}))


const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Why Not"}],
  [2, { priceInCents: 20000, name:"Learn Stuff"}],
])

app.post('/create-checkout-session', async (req, res) => {
  try{

    const session = await stripe.checkout.sessions.create({
      
      payment_method_types:[
        "fpx", "card"
      ],
      mode: 'payment',

      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'myr',
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      
      success_url: `${process.env.CLIENT_URL}/home`, //where to go after success
      cancel_url: `${process.env.CLIENT_URL}/Cart`, //where to go after cancel
    });

    res.json({url: session.url});
    //res.redirect(303, session.url);

} catch(e) {
  res.status(500).json({error: e.message})
  console.error(e.message)
}

});


app.listen(port, () => console.log('Running on port ' + port));