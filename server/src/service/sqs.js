import Producer from 'sqs-producer';
import uuid from 'uuid/v4';

const {
  AWS_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_SQS_QUEUE_URL: queueUrl,
} = process.env;

const producer = Producer.create({
  queueUrl,
  region,
  accessKeyId,
  secretAccessKey,
});

export const sqsNewUser = (username) => {
  const id = uuid();

  producer.send([
    {
      id: username + Date.now().toString(),
      body: 'body',
      messageAttributes: {
        type: { DataType: 'String', StringValue: 'NEW_USER' },
        username: { DataType: 'String', StringValue: username },
      },
      groupId: id,
      deduplicationId: id,
    },
  ], function(err) {
    if (err) console.log(err);
  });
}
