from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Thread


class CreateThreadForm(FlaskForm):
    userId = IntegerField("userId", validators=[
        DataRequired(message="Must associate with a user")]
    )
    jokeId = IntegerField("jokeId", validators=[
        DataRequired(message="Must associate with a joke")]
    )
    comment = StringField(
        'comment', validators=[
            DataRequired(message="A comment is required"),
            Length(min=1, max=500, message="Joke must be less than 500 characters"), ]
    )
