from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, Optional
from app.models import Joke


class CreateJokeForm(FlaskForm):
    userId = IntegerField(
        "userId", validators=[DataRequired(message="Must associate with a user")]
    )
    joke = StringField(
        'joke', validators=[
            DataRequired(message="A joke is required"),
            Length(min=1, max=800, message="Joke must be less than 800 characters"), ]
    )
    jokeType = StringField(
        "jokeType",
        validators=[
            DataRequired(message="Must specify joke type"),
            Length(min=1, max=50,
                   message="Joke type must be less than 50 characters"),
        ],
    )
    imageURL = StringField(
        "imageURL",
        # validators=[Optional],
    )
