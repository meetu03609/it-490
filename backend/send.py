import pika
import sys

def sendMessageToRM(msg):
    credentials = pika.PlainCredentials('admin', 'admin')
    connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='10.144.198.172',
    virtual_host='/',
    port=5672,
    credentials=credentials))
    channel = connection.channel()
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