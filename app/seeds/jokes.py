from app.models import db, Joke
# from jokeapi import Jokes  # Import the Jokes class


def seed_jokes():

    jokes = [
        Joke(
            userId=1,
            joke="I ate a clock yesterday, it was very time-consuming.",
            imageURL="https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/5dcc8a5e5473766654e080bb_5d93d0a059ce656959dab196_logo-full-black-2000-p-500.png",
            jokeType="Misc",
        ),
        Joke(
            userId=2,
            joke='Why do we tell actors to “break a leg?” Because every play has a cast.',
            jokeType="Any",
        ),
        Joke(
            userId=3,
            joke='Helvetica and Times New Roman walk into a bar. “Get out of here!” shouts the bartender. “We don’t serve your type.”',
            jokeType="Any",
        ),
        Joke(
            userId=4,
            joke="A perfectionist walked into a bar...apparently, the bar wasn’t set high enough.",
            jokeType="Christmas",
        ),
        Joke(
            userId=2,
            joke="Why was 6 afraid of 7? Because 7 ate 9!",
            jokeType="Pun",
        ),
        Joke(
            userId=5,
            joke="I'm reading an antigravity book apparently, It's impossible to put down!",
            jokeType="Programming",
        ),
        Joke(
            userId=6,
            joke="What kind of cheese doesn't belong to you? Nacho cheese!",
            jokeType="Any",
        ),
        Joke(
            userId=7,
            joke="You can't trust atoms. They make up everything!             ",
            jokeType="Any",
        ),
        Joke(
            userId=8,
            joke="Why did the dog cross the road? To get to the barking lot!",
            jokeType="Any",
        ),
        Joke(
            userId=9,
            joke="AWhy do potatoes argue? Because they can't see eye to eye!",
            jokeType="Any",
        ),
        Joke(
            userId=1,
            joke="Why do mushrooms get invited to all the best parties? Because they are such fungis!",
            jokeType="Any",
        ),
        Joke(
            userId=3,
            joke="Can February March? No, but April May!",
            jokeType="Any",
        ),
        Joke(
            userId=6,
            joke="What's the loneliest cheese? ProvAlone!",
            jokeType="Any",
        ),
        Joke(
            userId=7,
            joke="What kind of dog does Dracula have? A bloodhound!",
            jokeType="Any",
        ),
        Joke(
            userId=8,
            joke="Did you get a haircut? No, I got them all cut!",
            jokeType="Any",
        ),
        Joke(
            userId=9,
            joke="What do you call a cold dog? A chili dog!",
            jokeType="Any",
        ),
        Joke(
            userId=4,
            joke="Why did the cat run away from the tree? It was afraid of the bark!",
            jokeType="Any",
        ),
        Joke(
            userId=2,
            joke="Why don't cannibals eat clowns? Because they taste funny!",
            jokeType="Any",
        ),
        Joke(
            userId=2,
            joke="How do you fix a broken tomato? Tomato paste!",
            jokeType="Any",
        ),
        Joke(
            userId=2,
            joke="Why don't eggs tell each other jokes? They'd crack each other up!",
            jokeType="Any",
        ),
        Joke(
            userId=2,
            joke="Why did the hipster burn his tongue on coffee? Because he drank it before it was cool!",
            jokeType="Any",
        ),
        Joke(
            userId=2,
            joke="Why did the farmer win an award? He was out standing in his field!",
            jokeType="Any",
        ),
    ]

    db.session.bulk_save_objects(jokes)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_jokes():
    db.session.execute("TRUNCATE users CASCADE;")
    db.session.commit()
