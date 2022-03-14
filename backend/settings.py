from flask import Flask, request, Response, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@192.168.10.55:3306/it490'
app.config['SQLALCHEMY_TRACk_MODIFICATIONS'] = False