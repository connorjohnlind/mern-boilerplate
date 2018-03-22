module.exports = (app) => {
  app.get('/api/demo/', (req, res) => {
    res.send({ demo: 'hey' });
  });
};
