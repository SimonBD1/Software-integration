"""create accounts table

Revision ID: b8e5031601fd
Revises: 
Create Date: 2025-04-03 09:25:37.556916

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b8e5031601fd'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    accounts_table = op.create_table(
        'accounts',
        sa.Column('id', sa.Integer()),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('description', sa.String(length=255)),
        sa.Column('last_transaction_date', sa.DateTime()),
        sa.PrimaryKeyConstraint('id'),
    )
    op.bulk_insert(
        accounts_table,
        [
            { 'id': 1, 'name': 'John Smith', 'description': 'CEO' },
            { 'id': 2, 'name': 'Ed Williams', 'description': 'CTO' },
            { 'id': 3, 'name': 'Wendy Jones', 'description': 'CFO' }
        ]
    )


def downgrade() -> None:
   op.drop_table('accounts')
