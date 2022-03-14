#!/usr/bin/env python
import pika
import time

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='10.144.117.195',     virtual_host='/',
    port=5672,
    credentials=credentials))
channel = connection.channel()