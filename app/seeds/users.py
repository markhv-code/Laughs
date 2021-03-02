from werkzeug.security import generate_password_hash
from app.models import db, User


# Adds a demo user
def seed_users():

    users = [
        User(
            username="Demo",
            email="demo@aa.io",
            password="password",
            imageURL="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5dcc8a5e5473766654e080bb_5d93d0a059ce656959dab196_logo-full-black-2000-p-500.png"
        ),
        User(
            username="Demo2",
            email="demo2@aa.io",
            password="password",
        ),
    ]

    db.session.bulk_save_objects(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute("TRUNCATE users CASCADE;")
    db.session.commit()
