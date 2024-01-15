const express = require("express");
const app = express();
const stripe = require('stripe')('sk_test_51OTgW5Iem9Mq2DarOKwLGUENVRfjj6NKu4jiiCDMk7Fl5PVfYepNDA6MEksyjHsqbPEtLoZeKDqiYTQavOzz2JW200fFHqzCkP');//secret key from Stripe dashboard
const port = 5173;

app.use(express.static("src"));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/payment_page", async (req, res) => {
  try{
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "myr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

}catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Direct server to operate on port 4242
app.listen(port, () => {
  console.log('Running on port '+ port);
});