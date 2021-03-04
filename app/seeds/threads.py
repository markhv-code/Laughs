from app.models import db, Thread


def seed_threads():

    threads = [
        Thread(
            userId=2,
            comment="Wow what a punny time joke!",
        ),
        Thread(
            userId=1,
            comment="ahhh the drawbacks of perfectionism",
        ),
    ]

    db.session.bulk_save_objects(threads)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_threads():
    db.session.execute("TRUNCATE users CASCADE;")
    db.session.commit()
