from flask import Blueprint, jsonify


bp = Blueprint('api_get_market_item_list', __name__, url_prefix='/api')

from pub.models import Item, Users

@bp.route('/get_market_item_list')
def get_market_item_list():
    market_item_list = Item.query.all()
    return jsonify([item.to_dict() for item in market_item_list])

# @bp.route('/get_inventory_item_list')
# def get_inventory_item_list():
    # current_user = #session
    # inventory_item_list = current_user.Inventory.query.all()
    # return jsonify([item.to_dict() for item in inventory_item_list])
