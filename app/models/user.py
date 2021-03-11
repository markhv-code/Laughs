from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    imageURL = db.Column(db.String(2083), nullable=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # jokes = relationship("Joke", backref="users")
    threads = relationship("Thread", backref="users")
    messages_sent = db.relationship(
        "Message", foreign_keys="Message.senderId", back_populates="sender"
    )
    messages_received = db.relationship(
        "Message", foreign_keys="Message.receiverId", back_populates="receiver"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "imageURL": self.imageURL,
            "timestamp": self.timestamp,
        }
