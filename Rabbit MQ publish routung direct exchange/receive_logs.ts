import * as amqp from 'amqplib/callback_api'

let args = process.argv.slice(2);

if(args.length === 0){
  console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      let ex = 'direct_logs';
  
      ch.assertExchange(ex, 'direct', {durable: false});
  
      ch.assertQueue('', {exclusive: true}, function(err, q) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

        args.forEach(function(severity) {
          ch.bindQueue(q.queue, ex, severity);
        })
        
  
        ch.consume(q.queue, function(msg) {
          console.log(" [x] %s: '%s'", msg!.fields.routingKey, msg!.content.toString());
        }, {noAck: true});
      });
    });
  });