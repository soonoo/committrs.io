import { PubSub } from '@google-cloud/pubsub';
import handler from './handler';

const pubsub = new PubSub();

const subscriptionName = 'committrs-sub';
const subscription = pubsub.subscription(subscriptionName);

subscription.on(`message`, handler);

