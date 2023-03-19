from flask import Blueprint, jsonify, session
from flask import request as f_req
bp = Blueprint('api_items', __name__, url_prefix='/api/items')


from pub import db
from pub.models import UserInfo

from ..functions.DBcontrol import database

import time
import requests
from datetime import timedelta

CACHE_EXPIRATION_TIME = timedelta(hours=1) #ToDo: config에 집어넣어 사용할 수 있는지 확인
ITEMS_CACHE = None
CACHE_TIMESTAMP = 0

@bp.route('/')
def get_items():
    global ITEMS_CACHE, CACHE_TIMESTAMP

    current_time = time.time()
    if ITEMS_CACHE and (current_time - CACHE_TIMESTAMP) < CACHE_EXPIRATION_TIME:
        return jsonify(ITEMS_CACHE)

    items = []
    base_url = 'https://maplestory.io/api/KMST/1150/item/'
    item_ranges = [
        range(20000, 20500, 50),
        range(30000, 30500, 50),
        range(1060000, 1060800, 50),
        range(1042000, 1042026, 2),
        range(1702000, 1702010, 2),
    ]

    for item_range in item_ranges:
        success_count = 0
        for item_id in item_range:
            if success_count >= 10:
                break
            url = f'{base_url}{item_id}'
            response = requests.get(url)

            if response.status_code == 200:
                try:
                    item_json = response.json()
                    item_data = {
                        'id': item_id,
                        'name': item_json['description'].get('name') if 'description' in item_json else 'Unknown',
                        'description': item_json['description'].get('description') if 'description' in item_json else 'Unknown',
                        'typeInfo': item_json.get('typeInfo', {}),
                        'subCategory': item_json['typeInfo'].get('subCategory') if 'typeInfo' in item_json else 'Unknown',
                        'isCash': item_json['metaInfo'].get('cash') if 'metaInfo' in item_json else False,
                        'icon': f'{base_url}{item_id}/icon'
                    }
                    items.append(item_data)
                    success_count += 1
                except:
                    pass

    ITEMS_CACHE = items
    CACHE_TIMESTAMP = current_time
    return jsonify(items)


@bp.route('/buy', methods=['POST'])
def buy_item():
    to_buy_item = f_req.json
    inven_update = UserInfo.Inventory(id=to_buy_item['id'], Icon=to_buy_item['icon'], Category=to_buy_item['category'], SubCategory=to_buy_item['subCategory'])
    database.upload(inven_update)
    return jsonify({"message": "Item purchased successfully"}), 200 #ToDo: try, except상황 확인