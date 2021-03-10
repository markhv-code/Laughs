from .db import db
from datetime import datetime


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    senderId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    receiverId = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    sender = db.relationship(
        "User", foreign_keys=[senderId], back_populates="messages_sent"
    )
    receiver = db.relationship(
        "User", foreign_keys=[receiverId], back_populates="messages_received"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "senderId": self.senderId,
            "receiverId": self.receiverId,
            "message": self.message,
            "sender": self.sender.to_dict(),
            "receiver": self.receiver.to_dict(),
            "timestamp": self.timestamp,
        }
