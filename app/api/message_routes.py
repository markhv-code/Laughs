from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.models import Message, db
from app.forms import CreateMessageForm
from app.api.auth_routes import validation_errors_to_error_messages

message_routes = Blueprint("messages", __name__)


@message_routes.route("")
# @login_required
def get_messages():
    """
    Get all messages
    """
    messages = Message.query.all()
    return {"messages": [message.to_dict() for message in messages]}


@message_routes.route("", methods=["POST"])
@login_required
def create_message():
    """
    Create new message
    """
    form = CreateMessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_message = Message(
            senderId=form.data["senderId"],
            receiverId=form.data["receiverId"],
            message=form.data["message"],
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    return {"errors": errors}


@message_routes.route("/<messageId>", methods=["DELETE"])
@login_required
def delete_message(messageId):
    """
    Delete message
    """
    message_to_delete = Message.query.get(messageId)
    if message_to_delete:
        db.session.delete(message_to_delete)
        db.session.commit()
        return "Deleted"
    else:
        print(f"-------- no message found with id {messageId} -------- ")
        return {"errors": "No message found with given id"}
