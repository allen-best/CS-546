const showsRoutes = require('./shows');
const searchRoutes = require('./search');

const constructorMethod = (app) => {
  app.use('/shows', showsRoutes);
  app.use('/search', searchRoutes);

  app.get('/', async (req, res) => {
    try {
        title = "Show Finder"
        description = "This is the main page of this application which will provide a search form to start a search of shows for a keyword."
        res.render('home/static', {title: title, description:description});
      } catch (e) {
        res.status(500).send();
      }
  });

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;