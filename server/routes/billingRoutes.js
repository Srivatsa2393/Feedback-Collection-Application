const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    //console.log(req.body);
    //somehow reach to the stripe api and finaize the bill/charge
    //after finalizing the charge we update the users number of credits
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    console.log(charge);
  });
};
