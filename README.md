# Best Routes

This project provides features to compute the minimun cost path between two points. To do so, it applies Dijkstra's Algorithm.
It is implemented in Node.js.

## Running the application
Before running the application, please make it sure you have [Node.js v12+](https://nodejs.org/en/) and [yarn package manager](https://yarnpkg.com/) installed on you local set. Please refer to the referenced links to further instructions on how to intall and configure them.

#### Step 1: Intall project's dependencies
Just type on terminal the following comment at project's root directory:

```sh
yarn install
```

#### Step 2: Start the application:
After that, bring app to live by issuing the command:

```sh
./src/index.js ./data/input-file.txt
```

_Obs:_ _The project already comes with the default input routes file at directory `./data/input-file.txt`. Feel free to replace it with another file you may have on your local filesystem._

It will start the application. There are two ways to interact with it:
1. **By a REPL terminal:** it will enable input of the routes to be computed on terminal. You must type routes in the format `SOURCE-DESTINY`. **Ex:** GRU-ORL 
2. **By an API endpoint:** the app will start listening on `http://localhost:3000`. You will be able to send a `GET` request to route `/routes/best` passing the parameter `source` and `destiny` as query strings. **Ex:** 
   `curl --location --request GET 'http://localhost:3000/routes/best?source=GRU&destiny=ORL'`


## Project's structure
All source code is located at `src` directory. The initialization `index.js` file is on the top level of `src` folder, along with the other startup scripts for the terminal interactive prompt (`repl.js`) and for the API server (`server.js`).

The subdirectory `src/routes` organizes the API endpoints that were made available, and the directory `src/controllers` includes the controller scripts for each endpoint. The folder `src/libs` stores the reusable functions and utilities.

The directory `test`, in turn, contains all unit test specs for the functionalities.

## API structure
There are two REST endpoints available in the application's API:

- `GET {base_url}/routes/best`: it receives the parameters `source` and `destiny` in query string and returns the minimum cost path among them. The result body is presented as a JSON object in the format:
  ```json
  {
    "cost": 35,
    "path": [
        "GRU",
        "BRC",
        "SCL",
        "ORL"
    ]
  }
  ```
The `path` property lists points that compose the minimun cost path between the `source` and `destiny`. In this example, the source is `GRU` and the destiny is `ORL`. The property `cost` brings the total cost to be spent to reach destiny from source in the path presented. So, for that case, the path would be `GRU - BRC - SCL - ORL` at a cost of $35. 

- `POST {base_url}/routes`: this endpoint is used to include/update the input file. The data must be sent as a JSON object in request body in the format:
  ```json
  {
    "source": "BSB",
    "destiny": "GRU",
    "cost": 12
  }
  ```
  If the routes file already contains a route for the source and destiny informed, then it just updates the cost for the existing route. Otherwise, it will add a new entry in the route file.

  ## Test the application
  To execute the unit test cases, just type the following commands on terminal at project's root directory:

  ```sh
  yarn test
  ```

  Checking coverage:
   ```sh
  yarn test-coverage
  ```