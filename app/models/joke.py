from .db import db
from datetime import datetime
from sqlalchemy.orm import relationship, backref


class Joke(db.Model):
    __tablename__ = 'jokes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    joke = db.Column(db.String(800), nullable=False)
    imageURL = db.Column(db.String(2083), nullable=True)
    jokeType = db.Column(db.String(50), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    threads = db.relationship("Thread", backref="joke",
                              cascade="all, delete, delete-orphan")
    users = db.relationship("User", backref="jokes")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "joke": self.joke,
            "imageURL": self.imageURL,
            "jokeType": self.jokeType,
            "timestamp": self.timestamp,
            "users": self.users.to_dict(),
            "threads": [thread.to_dict() for thread in self.threads],
        }
