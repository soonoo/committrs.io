import _ from '../env';
import AWS from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import handler from './handler';
import { sleep } from '../utils';

const {
  AWS_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_SQS_QUEUE_URL: queueUrl,
  AWS_SQS_QUEUE_URL_DEV: queueUrlDev,
} = process.env;

const sqsConfig = {
  region,
  accessKeyId,
  secretAccessKey,
};

AWS.config.update(sqsConfig);

const app = Consumer.create({
  queueUrl: process.env.NODE_ENV === 'production' ? queueUrl : queueUrlDev,
  messageAttributeNames: ['All'],
  visibilityTimeout: 60 * 60 * 12,
  handleMessage: async (message) => {
    await handler(message);
  },
  sqs: new AWS.SQS(),
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.on('timeout_error', (err) => {
 console.error(err.message);
});

setTimeout(() => {
  app.start();
}, 3000);

