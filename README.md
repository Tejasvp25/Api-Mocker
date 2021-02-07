<h1 align="center">Welcome to Api-mocker 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/npm-%3E%3D5.5.0-blue.svg" />
  <img src="https://img.shields.io/badge/node-%3E%3D9.3.0-blue.svg" />
  <a href="https://github.com/Tejasvp25/Api-Mocker#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Tejasvp25/Api-Mocker/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Tejasvp25/Api-Mocker/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Tejasvp25/Api-mocker" />
  </a>
</p>

> Simple HTTP Server to Mock JSON Api Response

## Prerequisites

- npm >=5.5.0
- node >=9.3.0

## Installation

```sh
npm i @tejasvp25/api-mocker
```

## Sample Config

```sh
#   Global Headers will be set to Every endpoint response ( Can be overidden by Local Header )
#   "method" defines the type of Request
#   "status_code" defines the Status Code returned
#   "response" defines the Response to specific endpoint

{
  "globalHeaders": { "Content-Size": 100 },
  "endpoint": [
    {
      "endpoint": "test3", //   => http://localhost:8080/test3
      "method": "get",
      "localHeaders": {
        "Content-Type": "application/json"
      },

      "status_code": 200,
      "response": { "name": "ABC", "age": 19 }
    }
  ],

  "groups": [
    {
      "name": "api",
      "endpoints": [
        {
          "method": "get",
          "endpoint": "test1", //   => http://localhost:8080/api/test1
          "localHeaders": { "Content-Type": "text/plain" },
          "status_code": 200,
          "response": "asdasd"
        },
        {
          "method": "post",
          "endpoint": "test",
          "status_code": 500
        }
      ]
    },
    {
      "name": "api1",
      "endpoints": [
        {
          "method": "get",
          "endpoint": "test1", //   => http://localhost:8080/api1/test1
          "status_code": 200
        },
        {
          "method": "delete",
          "endpoint": "test",
          "status_code": 500
        }
      ]
    },
    {
      "name": "abc",
      "endpoints": [
        {
          "method": "get",
          "endpoint": "xyz", //   => http://localhost:8080/abc/xyz
          "status_code": 200
        },
        {
          "method": "post",
          "endpoint": "test", //   => http://localhost:8080/abc/test
          "status_code": 500
        }
      ]
    }
  ]
}


```

## Usage

```sh
npm run start -- --port=2000 --config=example.json
```

OR

```sh
node index.js --port=2000 --config=example.json
```

- **--port** denotes the Port Number to Run Server
- **--config** denotes the filename of Config

## Author

👤 **Tejasvp25**

- Website: http://thetejasvp25.tech
- Github: [@Tejasvp25](https://github.com/Tejasvp25)
- Gmail ID: tejasvp25@gmail.com

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Tejasvp25/Api-Mocker/issues). You can also take a look at the [contributing guide](https://github.com/Tejasvp25/Api-Mocker/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## TODO ✓

- Add Support for XML

## 📝 License

Copyright © 2021 [Tejasvp25](https://github.com/Tejasvp25).<br />
This project is [MIT](https://github.com/Tejasvp25/Api-Mocker/blob/master/LICENSE) licensed.
