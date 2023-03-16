from flask import Blueprint, request, render_template, flash, url_for
from werkzeug.utils import redirect

from pub.models import Users, Market
from pub import db

bp = Blueprint('purchase', __name__)

@bp.route('/', methods=['POST'])
def purchase_item():
    item_id = request.form['item_id']  # 양식에서 제출된 항목의 ID
    user_id = request.form['user_id']  # 양식에서 제출된 사용자 ID
    print('hi')
    to_purchase_item = Market.query.get_or_404(item_id)
    buyer = Users.query.get_or_404(user_id)
    if buyer.money < to_purchase_item.price:
        flash('돈이 부족합니다!')
    else:
        buyer.money -= to_purchase_item.price
        db.session.commit()
        flash('아이템을 구매했습니다!')
    return redirect(url_for('market.detail', item_id=item_id))