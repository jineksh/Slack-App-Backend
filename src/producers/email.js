import emailQueue from '../queues/email.js'
export default async function emailProducer({ to, subject, text }){
    try {
        console.log('inside producers');
        await emailQueue.add('emailJob', { to, subject, text });
        console.log('job added');
    } catch (error) {
        console.error('Error adding job to queue:', error);
    }
}
