from flask import Blueprint, request
from flask_login import login_required

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


@thread_routes.route("", methods=["POST"])
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
        print("----------newthread----", new_thread)
        return new_thread.to_dict()

    errors = validation_errors_to_error_messages(form.errors)

    return {"errors": errors}


@thread_routes.route("/<threadId>", methods=["PUT"])
@login_required
def update_thread(threadId):
    """
    Update thread
    """
    form = CreateThreadForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    thread_to_update = Thread.query.get(threadId)

    thread_to_update.comment = form.data["comment"]

    if form.validate_on_submit():
        db.session.add(thread_to_update)
        db.session.commit()
        return thread_to_update.to_dict()

    errors = validation_errors_to_error_messages(form.errors)

    return {"errors": errors}


@thread_routes.route("/<threadId>", methods=["DELETE"])
@login_required
def delete_thread(threadId):
    """
    Delete thread
    """
    thread_to_delete = Thread.query.get(threadId)
    if thread_to_delete:
        db.session.delete(thread_to_delete)
        db.session.commit()
        return "Deleted"
    else:
        print(f"-------- no thread found with id {threadId} -------- ")
        return {"errors": "No thread found with given id"}
