#!/usr/bin/env python
import pika
import time

credentials = pika.PlainCredentials('admin', 'admin')
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='192.168.10.55', 
    virtual_host='/',
    port=5672,
    credentials=credentials))
channel = connection.channel()