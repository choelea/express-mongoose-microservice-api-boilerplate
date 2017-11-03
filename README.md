# express-mongoose-microservice-api-boilerplate
An boilerplate for microservice

# 代码规范


# Express 需要注意的地方
## Error Handling
(摘自官方https://expressjs.com/en/guide/using-middleware.html)
> Error-handling middleware always takes four arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don’t need to use the next object, you must specify it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will fail to handle errors.

## Usage of Return
(引用：https://stackoverflow.com/questions/16667783/express-route-return-necessary-or-not)

The return is only necessary if you have more code below that point in the route handler function and you want to bypass the rest of the function. Nothing in express will look at or care about the value you return. If you are at the bottom of your function anyway, you may omit the return statement entirely.

Typically, you see patterns like:

- first do some prerequisite checking, validation, authorization, or similar logic
- If any of that fails, send and error and return from the function to bypass the main logic
- Main logic code comes next and only executes if the return wasn't encountered.

## Catch what you throw
(https://stackoverflow.com/questions/27794750/node-js-with-express-throw-error-vs-nexterror)
> In general express follows the way of passing errors rather than throwing it, for any errors in the program you can pass the error object to 'next' , also an error handler need to be defined so that all the errors passed to next can be handled properly

## GET /favicon.ico
从浏览器直接访问Get API，浏览器会自动请求GET /favicon.ico。 会导致后台有404 ("Request resource doesn't exist") 的log。 **可以忽略次错误信息**


