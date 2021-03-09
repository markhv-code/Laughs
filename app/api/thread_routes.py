from flask import Blueprint

from app.models import Thread, db
from app.forms import CreateThreadForm
from app.api.auth_routes import validation_errors_to_error_messages

thread_routes = Blueprint("threads", __name__)


@thread_routes.route("")
def get_threads():
    """
    Get all threads
    """
    threads = Thread.query.all()
    return {"threads": [thread.to_dict() for thread in threads]}


@joke_routes.route("", methods=["POST"])
@login_required
def create_joke():
    """
    Create new joke
    """
    form = CreateThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_thread = Thread(
            userId=form.data["userId"],
            jokeId=form.data["jokeId"],
            comment=form.data["comment"],
        )
        db.session.add(new_thread)
        db.session.commit()
        return new_thread.to_dict()
