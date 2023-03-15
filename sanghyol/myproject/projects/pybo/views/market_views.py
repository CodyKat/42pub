from flask import Blueprint, render_template

from pybo.models import Market
bp = Blueprint('market', __name__, url_prefix='/Market')

@bp.route('/item_list/')
def item_list():
    item_list = Market.query.order_by(Market.id.desc())
    return render_template('items/item_list.html', item_list=item_list)

@bp.route('/detail/<int:item_id>/')
def detail(item_id):
    item = Market.query.get_or_404(item_id)
    print(item)
    return render_template('Market/item_detail.html', item=item)