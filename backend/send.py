import pika
import sys

def sendMessageToRM(msg):
    credentials = pika.PlainCredentials('admin', 'admin')
    connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost',
    virtual_host='/',
    port=5672,
    credentials=credentials))

    if not connection or connection.is_closed:
        credentials = pika.PlainCredentials('admin', 'admin')
        connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='10.144.66.8',
        virtual_host='/',
        port=5672,
        credentials=credentials))

    if not connection or connection.is_closed:
        credentials = pika.PlainCredentials('admin', 'admin')
        connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='10.144.208.201',
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