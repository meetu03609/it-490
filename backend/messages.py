from settings import *
import json

db = SQLAlchemy(app)


class Message(db.Model):
    __tablename__ = 'Message' # Creating a table
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(1600))

    def json(self):
        return {'id': self.id, 'message': self.message}

    def add_message(_message):
        new_message = Message(message=_message)
        db.session.add(new_message)
        db.session.commit()

    def get_all_messages():
        return [Message.json(message) for message in Message.query.all()]

    def delete_message(_id):
        Message.query.filter_by(id=_id).delete()


        