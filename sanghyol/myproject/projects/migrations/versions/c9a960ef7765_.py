"""empty message

Revision ID: c9a960ef7765
Revises: 6d831fd051f2
Create Date: 2023-03-16 03:08:12.317089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9a960ef7765'
down_revision = '6d831fd051f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('market',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('items', sa.String(length=100), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('items')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('point', sa.Integer(), nullable=False))
        batch_op.drop_column('wallet')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('wallet', sa.INTEGER(), nullable=False))
        batch_op.drop_column('point')

    op.drop_table('market')
    # ### end Alembic commands ###