from flask.cli import AppGroup
from .users import seed_users, undo_users
from .threads import seed_threads, undo_threads
from .jokes import seed_jokes, undo_jokes
from .messages import seed_messages, undo_messages
# from .best_friends import seed_best_friends, undo_best_friends

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_jokes()
    seed_threads()
    seed_messages()
    # seed_best_friends()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_messages()
    undo_threads()
    undo_jokes()
    undo_users()
    # undo_best_friends()
