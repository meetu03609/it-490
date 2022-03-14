from flask import Flask
from messages import *
#!/usr/bin/env python
import pika
import sys

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='192.168.10.55', 
    virtual_host='/',
    port=5672,
    credentials=credentials))
channel = connection.channel()

# app = Flask(__name__)

@app.route('/')
def home():
    return 'Backend api'


@app.route('/messages', methods=['GET'])
def get_messages():
    return jsonify({'Messages': Message.get_all_messages()})


@app.route('/messages', methods=['POST'])
def add_comment():
    request_data = request.get_json()

channel.queue_declare(queue='task_queue', durable=True)

    message = ' '.join(sys.argv[1:]) or "Hello World!"
    channel.basic_publish(
        exchange='',
        routing_key='task_queue',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2,  # make message persistent
        ))
    print(" [x] Sent %r" % message)
    connection.close()

    Message.add_message(request_data['message'])
    response = Response('Message added', 201, mimetype='application/json')
    return response

@app.route('/messages/<int:id>')
def remove_message(id):

    Message.delete_message(id)
    response = Response('Message deleted', status=200, mimetype='application/json')
    return response


if __name__ == "__main__":
    app.run(port=8000, debug=True, host='0.0.0.0')