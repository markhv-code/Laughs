from .db import db
from datetime import datetime


class Joke(db.Model):
    __tablename__ = 'jokes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    joke = db.Column(db.String(800), nullable=False)
    imageURL = db.Column(db.String(2083), nullable=True)
    jokeType = db.Column(db.String(50), nullable=False)
    threadId = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "joke": self.joke,
            "imageURL": self.imageURL,
            "jokeType": self.jokeType,
            "threadId": self.threadId,
            "timestamp": self.timestamp,
        }
