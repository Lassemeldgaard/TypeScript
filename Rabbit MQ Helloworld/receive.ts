import * as amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        let q = 'hello';

        ch.assertQueue(q, {durable: false});

        console.log(" [*] waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg){
            console.log(" [x] Recieve %s", msg!.content.toString());
            
        }, {noAck: true});
        
    });
});