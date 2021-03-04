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

    if form.validate_on_submit() and not image_error:

        output_link = (
            upload_file_to_s3(image)
            if image
            else "https://pair-yo-pet-aws.s3-us-west-1.amazonaws.com/default-dog.png"
        )

        new_joke = Joke(
            userId=form.data["userId"],
            joke=form.data["joke"],
            imageURL=output_link,
            jokeType=form.data["jokeType"],
            threadId=form.data["threadId"],
        )
        db.session.add(new_joke)
        db.session.commit()
        return new_joke.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    errors += image_error

    return {"errors": errors}


@joke_routes.route("/<jokeId>", methods=["PUT"])
@login_required
def update_joke(jokeId):
    """
    Update joke
    """
    form = CreateJokeForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image_error = []
    image = request.files.get("image", None)

    joke_to_update = Joke.query.get(jokeId)

    print("joke to update ------------------ ", joke_to_update.to_dict())

    joke_to_update.joke = form.data["joke"]
    joke_to_update.jokeType = form.data["jokeType"]

    if image is not None:
        image.filename = secure_filename(image.filename)
        pattern = re.compile(
            ".*(apng|avif|jpe?g|png|svg|webp)$", re.IGNORECASE)
        is_image = bool(pattern.match(image.mimetype))
        if not is_image:
            image_error.append(
                "Upload must be an image (apng, avif, jpeg/jpg, png, svg, webp)."
            )

    if form.validate_on_submit() and not image_error:

        output_link = upload_file_to_s3(image) if image else None

        if output_link:
            joke_to_update.imageURL = output_link

        print("updated joke ------------------ ", joke_to_update.to_dict())

        db.session.add(joke_to_update)
        db.session.commit()
        return joke_to_update.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    errors += image_error

    return {"errors": errors}


@joke_routes.route("/<jokeId>", methods=["DELETE"])
@login_required
def delete_joke(jokeId):
    """
    Delete joke
    """
    joke_to_delete = Joke.query.get(jokeId)
    if joke_to_delete:
        db.session.delete(joke_to_delete)
        db.session.commit()
        return "Deleted"
    else:
        print(f"-------- no joke found with id {jokeId} -------- ")
        return {"errors": "No joke found with given id"}
