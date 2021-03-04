from flask import Blueprint, jsonify, request
from flask_login import login_required
from werkzeug.utils import secure_filename

from app.helpers import upload_file_to_s3
from app.models import Joke, db
from app.forms import CreateJokeForm
from app.api.auth_routes import validation_errors_to_error_messages

joke_routes = Blueprint("jokes", __name__)


@joke_routes.route("")
def get_jokes():
    """
    Get all jokes
    """
    jokes = Joke.query.all()
    return {"jokes": [joke.to_dict() for joke in jokes]}


@joke_routes.route("", methods=["POST"])
@login_required
def create_joke():
    """
    Create new joke
    """
    form = CreateJokeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image_error = []
    image = request.files.get("image", None)

    if image is not None:
        image.filename = secure_filename(image.filename)
        pattern = re.compile(
            ".*(apng|avif|jpe?g|png|svg|webp)$", re.IGNORECASE)
        is_image = bool(pattern.match(image.mimetype))
        if not is_image:
            image_error.append(
                "Upload must be an image (apng, avif, jpeg/jpg, png, svg, webp)."
            )
