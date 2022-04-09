#!/usr/bin/env python
import pika

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='10.144.198.172',
    virtual_host='/',
    port=5672,
    credentials=credentials))
channel = connection.channel()