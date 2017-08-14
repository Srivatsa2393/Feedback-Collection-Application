module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    //somehow reach to the stripe api and finaize the bill/charge
    //after finalizing the charge we update the users number of credits
  });
};
