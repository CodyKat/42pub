from flask import Blueprint, render_template

from pybo.models import Users, Market

bp = Blueprint('main', __name__, url_prefix='/')
@bp.route('/hello')
def hello():
    return 'hello'

@bp.route('/Market')
def market():
    item_list = Market.query.order_by(Market.id.desc())
    return render_template('Market/item_list.html', item_list=item_list)

@bp.route('/detail/<int:item_id>/')
def detail(item_id):
    item = Market.query.get_or_404(item_id)
    print(item)
    return render_template('Market/item_detail.html', item=item)

@bp.route('/')
def index():
    return 'index'
