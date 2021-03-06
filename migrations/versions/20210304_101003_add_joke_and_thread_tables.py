"""add joke and thread tables

Revision ID: 1f2efca01512
Revises: 0426c221bc2d
Create Date: 2021-03-04 10:10:03.485142

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f2efca01512'
down_revision = '0426c221bc2d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('threads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('jokeId', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_threads_timestamp'), 'threads', ['timestamp'], unique=False)
    op.create_table('jokes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('joke', sa.String(length=800), nullable=False),
    sa.Column('imageURL', sa.String(length=2083), nullable=True),
    sa.Column('jokeType', sa.String(length=50), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_jokes_timestamp'), 'jokes', ['timestamp'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_jokes_timestamp'), table_name='jokes')
    op.drop_table('jokes')
    op.drop_index(op.f('ix_threads_timestamp'), table_name='threads')
    op.drop_table('threads')
    # ### end Alembic commands ###
