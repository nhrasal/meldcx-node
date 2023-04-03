<p align="center">
  <a href="https://expressjs.com" target="blank"><img src="https://expressjs.com/images/favicon.png" width="50" height="50" alt="ExpressJs" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> Fast, unopinionated, minimalist web framework for Node.js</p>
    <p align="center">

## Add information or configure your .env file on root directory

- PORT=3000
- FOLDER=files
- DOWNLOAD_LIMIT_PER_DAY=3
- UPLOAD_LIMIT_PER_DAY=3
- PROVIDER=local

# file server configuration into .env file

- AWS_ACCESS_KEY_ID=
- AWS_SECRET_ACCESS_KEY=
- AWS_REGION=
- AWS_BUCKET_NAME=
- AWS_PREFIX_URL=
- AWS_PREFIX_URL_REMOVE=

# data cleaning period in day into .env file

- CLEANING_PERIOD_IN_DAY=1

## Installation

```bash
$ npm install or yarn install
```

## Running the app

```bash
# development
$ npm start or  yarn start
- app running 3000 port or your configure port like: http://localhost:300
```

## Test

```bash
# unit tests
$ npm test or yarn run test
```

## Description

- “POST /files” - this endpoint will be used to upload new files.It will response publicKey and privateKey.
- “GET /files/:publicKey” - this endpoint will be used to download existing files. It
  should accept “publicKey” as a request parameter and return a response stream
  with a MIME type representing the actual file format.

- “DELETE /files/:privateKey” - this endpoint will be used to remove existing files.
  It should accept “privateKey” as a request parameter and return a response in
  JSON format confirming the file removal
- Add AWS SDK for AWS Cloud Storage file upload and remove function.
- Add Node cron for to cleanup uploaded files after configurable
  period of inactivity.
- Add Jest JavaScript Testing Framework for unit and integration test
- Daily download and upload limits for the network traffic from the same IP address implemented by configurable variable from env
- Add AWS SDK for AWS Cloud Storage file upload and remove function.
- Add Node cron to clean up uploaded files after a configurable period of inactivity and env variable CLEANING_PERIOD_IN_DAY 
- Add Jest JavaScript Testing Framework for unit and  integration testing

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
