
import * as amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        let q = 'hello';

        ch.assertQueue(q, {durable: false});

        ch.sendToQueue(q, new Buffer('hello world'));
        console.log(" [x] Sent 'Hello World!'");
        
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
});