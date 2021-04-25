const constructorMethod = (app) => {

  app.get('/', async (req, res) => {
    try {
        title = "The Whole Fibonacci & Prime Number Checker"
        res.render('home/static', {title: title});
      } catch (e) {
        res.status(500).send();
      }
  });

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;