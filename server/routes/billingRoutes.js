const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    //console.log(req.body);
    //somehow reach to the stripe api and finaize the bill/charge
    //after finalizing the charge we update the users number of credits
    //check whether user is logged in
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });

    //console.log(charge);
    //respond to request with newly updated user model
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
