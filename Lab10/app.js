const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

const handlebarsInstance = exphbs.create({defaultLayout: 'main'});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  next();
};

app.use;
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));
app.use('/public', static);
app.use('/private', (req, res, next) => {
    if (!req.session.AuthCookie) {
      return res.status(403).render('error/static', {title:"Status Code: 403"});
    } else {
      next();
    }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.use(async (req, res, next) => {
    let authString = "";
    if (!req.session.AuthCookie) {
        authString = " (Non-Authenticated User)"
    } else {
        authString = " (Authenticated User)"
    }
    currentTimestamp = new Date().toUTCString();
    console.log("[" + currentTimestamp + "]: " + req.method + " " + req.originalUrl + authString)

    next();
});

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});