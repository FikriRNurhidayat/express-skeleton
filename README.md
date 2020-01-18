# Express Skeleton
This repository is definitely like its title. It's Express Skeleton with a lot of feature in it, such as Auto Generate Swagger for your API, and also you don't need to do require everytime you create a new endpoint.
## How to use
Make sure you have this in your computer ```node.js 10.16 LTS``` higher version might not work properly
* Run ```npm install```
* You only need to create controller
* NPM Start
### Controller
Damn, bruh!
Now you can use generator script.
```
npm run generate:controller <controller_name> :get :post <path>:post <path>:get --namespace=<namespace>
```
Example:
```
npm run generate:controller test :get :post ping:get --namespace=v2
```
Then it will create a new file in the **src/controllers/v2/**


Every folder in controllers folder will be considered as prefix on your endpoint. In this current repository, the namespace will be **/api/v1/**. It's **/api** because of ```app.use('/api', router);```. And it's **/v1** because in the ```index.js``` of controllers folder will contain **v1** folder and it will be considered as prefix.
If you're willing to create a new endpoint, just follow this steps:
1. Create a new file, under *v1* folder with JS extention.
2. Create variable called **resources** as Array
3. In resources array create an object, it will define your endpoint
4. That object require this properties: 
```
{
  method: 'POST', // required
  path: '/', // required,
  middlewares: [authenticate], // optional
  params: {
    title: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    }
  }, // optional
  handler: function(req, res, next) {
    res.status(200).json({
      success: true,
      data: "Hello there"
    })
  } // This is your router callback function
}
```
5. After that, you need to export something in that file. You have to export it this way:
```
module.exports = {
  namespace: '/articles', // It will be your resources name, /api/v1/article
  resources // to exports all your resources
}
```
6. And you've done to create your endpoint
### Using Response Handler
I create some response formatter as middleware, all you need to do is pass your data to ```req.body``` and then call ```next()```
Of course it has format, here's the format/data that you should pass:
```
req.body = [true, <YOUR DATA HERE>, 200] // True indicate success: true, and false indicate success: false and it will create errors key
next()
```
### Accessing Swagger
By default it should be **/documentation**, of course you can change it as your will. Just open ```src/index.js``` and find
```
app.use('/YOUR_CUSTOM_ENDPOINT', swaggerUI.serve, swaggerUI.setup(docs));
```
### Using params in controllers
The rule of using params is just the same as ```fastest-validator``` because I create a middleware using it.
## Dependencies
* ```fastest-validator```
* ```express```
* ```swagger-ui-express```
* ```multer```
