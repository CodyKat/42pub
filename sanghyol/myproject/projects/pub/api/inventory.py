from flask import Blueprint, jsonify, session
from flask import request as f_req


bp = Blueprint('api_inventory', __name__, url_prefix='/api/inventory')


from pub import db
from pub.models import UserInfo

from ..functions.DBcontrol import database

import time
import requests
from datetime import timedelta


@bp.route('/', methods=['GET'])
def get_inventory_items():
    current_username = session.get('user_name')
    current_user_info = UserInfo.query.filter_by(UserName=current_username).first()
    try:
        current_user_inven = current_user_info.Inventory.query.all()
        return_item_list = [
            {
                'id': current_user_inven.id,
                'name': current_user_info.ItemName,
                'icon': current_user_info.Icon,
                'category': current_user_info.Category,
                'subCategory': current_user_info.SubCategory,
                'mounted': current_user_info.Mounted,
                'altarionPoints': current_user_info.Wallet
            } for item in current_user_info
        ]
    except AttributeError: #ToDo: 세션 구현 되었을 때 필요없을 것으로 예상.
        return_item_list = {
            'id': 0,
            'name': 0,
            'icon': 0,
            'category': 0,
            'subCategory': 0,
            'mounted': 0,
            'altarionPoints': 0
        }
    return jsonify(return_item_list)

from ..functions.utils import random_success
@bp.route('/enhance', methods=['POST'])
def enhance_item():
    enhance_info = f_req.json
    user_name = session.get('user_name')
    user_info = UserInfo.query.filter_by(UserName=user_name)
    status = dict()
    if user_info.Wallet >= 1: #ToDo: 강화비용 임시 1 지정
        item_info = UserInfo.Inventory.query.get(id=enhance_info['id'])
        if item_info:
            if random_success.by_probability():
                item_info.Enhancement += 1
                user_info.Wallet -= 1
                db.session.commit()
                status['success'] = True
            else: status['success'] = False

            status['enhancementLevel'] = item_info.Enhancement
            status['altarionPoints'] = user_info.Wallet
    else:
        status['error'] = "Not enough Altarion Points"
    return jsonify(status)

@bp.route('/toggle-mount', methods=['POST'])
def toggle_mount():
    data = f_req.json
    item_id = data['id']
    get_item = UserInfo.Inventory.query.get(id=item_id)
    if get_item:
        get_item.Mounted = not get_item.Mounted
        db.session.commit()
        status = {
            'mounted': get_item.Mounted
        }
    return jsonify(status)