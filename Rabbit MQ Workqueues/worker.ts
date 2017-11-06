import * as amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        let q = 'task_queue1';

        ch.assertQueue(q, {durable: true});

        console.log(" [*] waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg){
            let secs = msg!.content.toString().split('.').length - 1;
            console.log(" [x] Recieve %s", msg!.content.toString());
            setTimeout(function(){
                console.log(" [x] Done");
                
            }, secs * 1000);
            
        }, {noAck: true});
        
    });
});