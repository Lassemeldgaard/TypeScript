import * as amqp from 'amqplib/callback_api'

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
      let ex = 'direct_logs';
      let args  = process.argv.slice(2);
      let msg = process.argv.slice(1).join(' ') || 'Hello World!';
      let severity = (args.length > 0) ? args[0] : 'info';
  
      ch.assertExchange(ex, 'direct', {durable: false});
      ch.publish(ex, severity, new Buffer(msg));
      console.log(" [x] Sent %s: '%s'", severity, msg);
    });
  
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
  });