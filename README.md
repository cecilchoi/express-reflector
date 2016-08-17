# express-reflector
reflect express routes

### Usage
```javascript
var reflector = require('express-reflector');
...
app.use('/api', function(req, res) {
  var routes = reflector(req.app);
  res.json(routes);
});
```

##### Example output
```javascript
{
  "/": {
    methods: {
      get: true,
      post: true
    },
  },
  "/path": {
    methods: {
      get: true
    },
    routes: {
      "/:param": {
        methods: {
          put: true
        }
      }
    }
  }
}
```

