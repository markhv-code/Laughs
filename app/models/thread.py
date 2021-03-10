from .db import db
from datetime import datetime


class Thread(db.Model):
    __tablename__ = 'threads'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    jokeId = db.Column(db.Integer, db.ForeignKey("jokes.id"), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "jokeId": self.jokeId,
            "comment": self.comment,
            "timestamp": self.timestamp,
        }