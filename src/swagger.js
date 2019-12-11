let data = {
  "swagger": "2.0",
  "info": {
    "description": "Coba Coba",
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "contact": {
      "email": "FikriRNurhidayat@gmail.com"
    }
  },
  "basePath": "/api",
  "tags": [],
  "paths": {}
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let controllers = require('./controllers');

for (let i in controllers) {
  controllers[i].forEach(c => {
    let tagName = capitalize(c.namespace.slice(1))
    let tag = {
      "name": tagName,
      "description": c.description ? c.description : `All about ${tagName}`
    }

    data.tags.push(tag);

    c.resources.forEach(r => { 
      let method = r.method.toLowerCase()
      let parameters = []
        
      // Validate Body
      let body = {};
      let required_body = []
      let params = {};
      let query = {};

      for (let i in r.params) {
        switch(r.params[i].in) {
          case 'path':
            params[i] = Object.assign({}, r.params[i]);
            delete params[i].in
            break;

          case 'body':
            body[i] = Object.assign({}, r.params[i]);
            if (body[i].required) {
              required_body.push(i)
            };
            body[i].in
            body[i].required
            break;

          case 'query':
            query[i] = Object.assign({}, r.params[i]);
            delete query[i].in
        }
      }

      if (Object.keys(params).length > 0) {
        for (let p in params) {
          let pathParams = {
            in: "path",
            name: p,
            required: params[p].required,
            type: params[p].type
          };
        
          parameters.push(pathParams);
        }
      }

      if (Object.keys(body).length > 0) {
        let bodyParams = {
          in: "body",
          name: "body",
          description: "JSON Object",
          required: true,
          schema: {
            type: "object",
            properties: body
          }
        }

        if (required_body.length > 0) bodyParams.schema.required = required_body;

        parameters.push(bodyParams)
      }

      if (Object.keys(query).length > 0) {
        for (let q in query) {
          queryParams = {
            in: "query",
            name: q,
            description: query[q].description,
            required:query[q].required,
            type: query[q].type
          }
          parameters.push(queryParams)
        } 
      }

      let path = r.path;
      if (path.indexOf(":") > -1) {
        path = path.replace(":","{") + "}"
      }

      if (!data.paths[`/${i}` + c.namespace + path]) {
        data.paths[`/${i}` + c.namespace + path] = {}
      }

      data.paths[`/${i}` + c.namespace + path][method] = {
        tags: [tagName],
        description: r.description,
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: parameters,
        responses:{
         200: {
          description: "OK"
         }
        }
      }
    })
  })
}

let fs = require('fs');
// fs.writeFileSync('./docs.json', JSON.stringify(data), null);

module.exports = data;
