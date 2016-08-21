# express-reflector
reflect express routes

### Usage
```javascript
var express = require('express');
...
//some routes
var index = require('./routes/index');
var users = require('./routes/users');
...
var app = express();
...
// use some routes
app.use('/', index);
app.use('/path', path);

...

//some where else
var reflector = require('express-reflector');

var routes = reflector(req.app);
```

##### Example output
```javascript
{
  "/": {
    methods: {
      get: true
    },
  },
  "/path": {
    methods: {
      get: true,
      post: true
    },
    routes: {
      "/:param": {
        methods: {
          put: true,
          delete: true
        }
      }
    }
  }
}
```

