# express-reflector
reflect express routes

### Usage
```javascript
var reflector = require('express-reflector');
var endPoints = reflector(expressApp);
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

