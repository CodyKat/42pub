from flask import Blueprint, render_template

from pub.models import Market, Users
bp = Blueprint('market', __name__, url_prefix='/Market')

@bp.route('/item_list/')
def item_list():
    item_list = Market.query.order_by(Market.id.desc())
    return render_template('Market/item_list.html', item_list=item_list)

@bp.route('/detail/<int:item_id>/')
def detail(item_id):
    item = Market.query.get_or_404(item_id)
    test_user = Users.query.get_or_404(1)
    return render_template('Market/item_detail.html', item=item, test_user=test_user)