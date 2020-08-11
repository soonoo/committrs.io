import Producer from 'sqs-producer';
import uuid from 'uuid/v4';

const {
  AWS_REGION: region,
  AWS_ACCESS_KEY: accessKeyId,
  AWS_SECRET_KEY: secretAccessKey,
  AWS_SQS_QUEUE_URL: queueUrl,
  AWS_SQS_QUEUE_URL_DEV: queueUrlDev,
} = process.env;

// const producer = Producer.create({
//   queueUrl: process.env.NODE_ENV === 'production' ? queueUrl : queueUrlDev,
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

export const sqsNewUser = ({ github_login, github_name }) => {
  const id = uuid();

  return
  // producer.send([
  //   {
  //     id: github_login + Date.now().toString(),
  //     body: 'body',
  //     messageAttributes: {
  //       type: { DataType: 'String', StringValue: 'NEW_USER' },
  //       github_login: { DataType: 'String', StringValue: github_login },
  //       github_name: { DataType: 'String', StringValue: github_name },
  //     },
  //     groupId: id,
  //     deduplicationId: id,
  //   },
  // ], function(err) {
  //   if (err) console.log(err);
  // });
}
