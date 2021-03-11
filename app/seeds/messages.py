from app.models import db, Message, User

# Adds a demo user


def seed_messages():

    user1 = User.query.filter_by(username="Demo").first()
    user2 = User.query.filter_by(username="Billy").first()
    user3 = User.query.filter_by(username="Mark").first()
    user4 = User.query.filter_by(username="Ellie").first()
    user5 = User.query.filter_by(username="Bowen").first()
    user6 = User.query.filter_by(username="Kirk").first()
    user7 = User.query.filter_by(username="Teresa").first()
    user8 = User.query.filter_by(username="Gus").first()
    user9 = User.query.filter_by(username="Emily").first()
    user10 = User.query.filter_by(username="Malcom").first()
    user11 = User.query.filter_by(username="Jeff").first()
    user12 = User.query.filter_by(username="Aniya").first()

    messages = [
        Message(
            senderId=user2.id,
            receiverId=user1.id,
            message="I love your joke",
        ),
        Message(
            senderId=user1.id,
            receiverId=user2.id,
            message="Thank you! I really love comedy also!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user2.id,
            message="When is a good time to hang out?",
        ),
        Message(
            senderId=user2.id,
            receiverId=user1.id,
            message="After I finish my group project!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user2.id,
            message="Sounds great brahhhh!",
        ),
        Message(
            senderId=user3.id,
            receiverId=user1.id,
            message="Wow you have the funniest joke ever!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user3.id,
            message="Thanks! They are not appreciated sometimes, but I love them!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user3.id,
            message="Would you like to meet up?",
        ),
        Message(
            senderId=user3.id,
            receiverId=user1.id,
            message="Yeah! Does tomorrow night work for you?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user3.id,
            message="For sure, we would love to. 6pm at the cafe?",
        ),
        Message(
            senderId=user3.id,
            receiverId=user1.id,
            message="Yes! We will see you there.",
        ),
        Message(
            senderId=user4.id,
            receiverId=user1.id,
            message="Your joke reminds me of my dog when he was little!!!!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user4.id,
            message="ahhh how precious! They are super adorable!",
        ),
        Message(
            senderId=user4.id,
            receiverId=user1.id,
            message="yes! Gotta love them while they are still small!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user5.id,
            message="Your joke reminds me of the move 'Marley and Me'!",
        ),
        Message(
            senderId=user5.id,
            receiverId=user1.id,
            message="LOL thanks! That is super funny!",
        ),
        Message(
            senderId=user5.id,
            receiverId=user1.id,
            message="What sort of jokes do you like to do?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user5.id,
            message="Oh I love programming and very puny jokes!",
        ),
        Message(
            senderId=user5.id,
            receiverId=user1.id,
            message="Oh no way! Me too! Let go this weekend together!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user5.id,
            message="Yeah I'm totally down!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user6.id,
            message="I feel like your jokes are heaven sent!",
        ),
        Message(
            senderId=user6.id,
            receiverId=user1.id,
            message="That's so funny, I had the same feeling!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user6.id,
            message="Wow that's so crazy! Let's meet up tonight!",
        ),
        Message(
            senderId=user7.id,
            receiverId=user1.id,
            message="I just have to say, that I think you have the most funniest joke in the whole wide world!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user7.id,
            message="ahhhhh thank you, that really warmed my soul",
        ),
        Message(
            senderId=user1.id,
            receiverId=user7.id,
            message="I think you are equally funny too!",
        ),
        Message(
            senderId=user8.id,
            receiverId=user1.id,
            message="What are the best jokes you got?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user8.id,
            message="I have all the dad jokes!",
        ),
        Message(
            senderId=user8.id,
            receiverId=user1.id,
            message="Wow ok, yeah. I wish you the best of luck with that!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user8.id,
            message="Thanks I'm gonna need it!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user9.id,
            message="Let's hang out next Thursday afternoon?!",
        ),
        Message(
            senderId=user10.id,
            receiverId=user1.id,
            message="Do you want to have a joke off?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user10.id,
            message="No, I have been feeling a little under the weather recently.",
        ),
        Message(
            senderId=user10.id,
            receiverId=user1.id,
            message="Ok I see. If you want I can bring my dog over for some little doggo cheer?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user10.id,
            message="Wow that would be awesome! Can you come over in the next hour?",
        ),
        Message(
            senderId=user10.id,
            receiverId=user1.id,
            message="Sure! See you soon!",
        ),
        Message(
            senderId=user11.id,
            receiverId=user1.id,
            message="Please let's hang out together?! I think we would have so much fun!",
        ),
        Message(
            senderId=user1.id,
            receiverId=user12.id,
            message="Knock knock",
        ),
        Message(
            senderId=user12.id,
            receiverId=user1.id,
            message="Who's there?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user12.id,
            message="Tank",
        ),
        Message(
            senderId=user12.id,
            receiverId=user1.id,
            message="Tank who?",
        ),
        Message(
            senderId=user1.id,
            receiverId=user12.id,
            message="You're welcom!",
        ),
        Message(
            senderId=user12.id,
            receiverId=user1.id,
            message="Wow that joke...",
        ),

    ]

    db.session.bulk_save_objects(messages)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_messages():
    db.session.execute("TRUNCATE messages;")
    db.session.commit()
