import _ from '../env';
import AWS from 'aws-sdk';
import handler from './handler';
import { sleep } from '../utils';

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

const receptionConfig = {
  QueueUrl,
  MaxNumberOfMessages: 1,
};

(async () => {
  while(true) {
    // receive message from queue
    sqs.receiveMessage(
      receptionConfig,
      async (err, data) => {
        if(err) {
          console.log(err);
          return;
        }
        if(!data.Messages) {
          return;
        }

        // handle message
        await handler(message);

        // delete handled message from queue
        sqs.deleteMessage({
          QueueUrl,
          ReceiptHandle: message.ReceiptHandle,
        }, (err, data) => {
          if(err) console.log(err)
          else console.log(data)
        });
      }
    );

    await sleep(3000);
  }
})();

