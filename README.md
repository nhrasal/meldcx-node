<p align="center">
  <a href="https://expressjs.com" target="blank"><img src="https://expressjs.com/images/favicon.png" width="200" alt="ExpressJs" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a>Fast, unopinionated, minimalist web framework for Node.js</p>
    <p align="center">

## Add information or configure your .env file on root directory

PORT=3000
FOLDER=files
DOWNLOAD_LIMIT_PER_DAY=3
UPLOAD_LIMIT_PER_DAY=3
PROVIDER=local

# file server configuration into .env file

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
AWS_PREFIX_URL=
AWS_PREFIX_URL_REMOVE=

# data cleaning period in day into .env file

CLEANING_PERIOD=1

## Installation

```bash
$ npm install or yarn install
```

## Running the app

```bash
# development
$ npm start or  yarn start

```

## Test

```bash
# unit tests
$ npm test or yarn run test
```

## Description

1. The API Server should implement the following HTTP REST API endpoints:
   a. “POST /files” - this endpoint will be used to upload new files. It should accept
   “multipart/form-data” requests and return a response in JSON format with the
   following attributes: “publicKey”, “privateKey”.
   b. “GET /files/:publicKey” - this endpoint will be used to download existing files. It
   should accept “publicKey” as a request parameter and return a response stream
   with a MIME type representing the actual file format.
   c. “DELETE /files/:privateKey” - this endpoint will be used to remove existing files.
   It should accept “privateKey” as a request parameter and return a response in
   JSON format confirming the file removal.

2. All the file access functionality should be implemented as a separate component
   a. This component should encapsulate all the internal file processing details and
   provide a simple interface for all the actions.
   b. The default implementation should work with local files located inside a root
   folder defined in the “FOLDER” environment variable.
   c. It should be possible to implement other storage providers connected to the
   popular cloud APIs using the same interface. Examples of such providers:
   Google Cloud Storage, Microsoft Azure Storage or AWS Cloud Storage.
3. The API Server should implement configurable daily download and upload limits for the
   network traffic from the same IP address
4. The API Server should have an internal job to cleanup uploaded files after configurable
   period of inactivity
5. All the HTTP REST API endpoints should be covered by integration tests
6. All the individual component methods should be covered by unit tests

## Stay in touch

- Author - [NH Rasal](https://www.linkedin.com/in/nhrasalcse/)
- Github - [NH Rasal](https://github.com/nhrasal/)
- LinkedIn - [@NH Rasal](https://www.linkedin.com/in/nhrasalcse/)
- Facebook - [@NH Rasal](https://www.facebook.com/nhrasal.cse/)

## Contributors ✨

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com"><img src="https://avatars.githubusercontent.com/u/32142476?v=4" width="100px;" alt="NH Rasal"/><br /><sub><b>NH Rasal</b></sub></a>
      </td>
    </tr>
  </tbody>
</table>
