#!/usr/bin/env python
import pika

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost',
    virtual_host='/',
    port=5672,
    credentials=credentials))
channel = connection.channel()