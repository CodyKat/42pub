from flask import Blueprint, request, render_template, flash, url_for
from flask_login import current_user
from werkzeug.utils import redirect

from pub.models import Users, Market, Inventory
from pub import db
import json

bp = Blueprint('purchase', __name__)

@bp.route('/', methods=['POST'])
def purchase_item():
    item_id = request.form['item_id']
    user_id = current_user.id
    to_purchase_item = Market.query.get_or_404(item_id)
    buyer = Users.query.get_or_404(user_id)
    if buyer.money < to_purchase_item.price:
        flash('돈이 부족합니다!')
    else:
        buyer.money -= to_purchase_item.price
        inven = Inventory(item_name=to_purchase_item.item_name, enhance=0, grade=to_purchase_item.grade, username=buyer.username)
        db.session.add(inven)
        db.session.commit()
        flash('아이템을 구매했습니다!')
    return redirect(url_for('market.detail', item_id=item_id))