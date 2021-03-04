from .db import db


class Joke(db.Model):
    __tablename__ = 'jokes'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    joke = db.Column(db.String(800), nullable=False)
    imageURL = db.Column(db.String(2083), nullable=False)
    jokeType = db.Column(db.String(50), nullable=False)
    threadId = db.Column(db.Integer, db.ForeignKey("threads.id"), nullable=False)
