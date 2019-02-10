const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const handler = require('./handler');

const subscriptionName = 'committrs-sub';
const subscription = pubsub.subscription(subscriptionName);

subscription.on(`message`, handler);

