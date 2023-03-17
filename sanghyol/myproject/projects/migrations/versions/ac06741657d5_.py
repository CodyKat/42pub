"""empty message

Revision ID: ac06741657d5
Revises: 1d9e1bbc642b
Create Date: 2023-03-18 05:41:03.786032

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac06741657d5'
down_revision = '1d9e1bbc642b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_name', sa.String(length=20), nullable=False))
        batch_op.create_unique_constraint(None, ['user_name'])
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=20), nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('user_name')

    # ### end Alembic commands ###