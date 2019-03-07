import AWS from 'aws-sdk';
import handler from './handler';
import dotenv from 'dotenv';
dotenv.config();

const {
  AWS_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_SQS_QUEUE_URL: QueueUrl,
} = process.env;

const sqsConfig = {
  region,
  accessKeyId,
  secretAccessKey,
};
const sqs = new AWS.SQS(sqsConfig);

sqs.receiveMessage(
  { QueueUrl },
  (err, data) => {
    if(err) console.log(err);
    if(data) console.log(data);
  }
);

