Built with `create-react-app` and deployed to Netlify. Utilizes Netlify's AWS Lambda functions to pull data from an [Airtable](https://airtable.com/) base.

# Developing

Start the dev server with:

```yarn run start```

> Be sure to use Node <= 9.x until `netlify-lambda` adds support for 10.

Access the site at [http://localhost:3000/](http://localhost:3000/). Lambda functions are mapped to [http://localhost:9000/](http://localhost:9000/) via the `src/lambda` directory.

> E.g., `http://localhost:9000/some-function` invokes `src/lambda/some-function.js`

To call the Lambda functions from the front-end in a way that will work locally and in production, point HTTP requests to `/.netlify/functions/some-function`, where `some-function` is the name of your Lambda endpoint from above.

# Building for production

Run `yarn run build` to generate the production assets and point the server to the `build` directory.
