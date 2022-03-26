from rabbitmq_connection import channel, pika, connection
import sys

def sendMessageToRM(msg):
    channel.queue_declare(queue='task_queue', durable=True)
    message = msg or "Hello World!"
    channel.basic_publish(
        exchange='',
        routing_key='task_queue',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    print(" [x] Sent %r" % message)
    connection.close()