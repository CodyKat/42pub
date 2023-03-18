from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import sqlite3
from sqlite3 import Error
import time
import json
import random

app = Flask(__name__)
CORS(app)

DATABASE = "inventory.db"

# Cache variables
CACHE_EXPIRATION_TIME = 3600  # 1 hour
ITEMS_CACHE = None
CACHE_TIMESTAMP = 0

def create_connection():
    conn = None;
    try:
        conn = sqlite3.connect(DATABASE)
        return conn
    except Error as e:
        print(e)

    return conn

def init_db():
    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Inventory (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            icon TEXT NOT NULL,
            enhancementLevel INTEGER NOT NULL DEFAULT 0,
            category TEXT NOT NULL,
            subCategory TEXT,
            mounted INTEGER NOT NULL DEFAULT 0,
            altarionPoints INTEGER NOT NULL DEFAULT 0
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS Showroom (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            icon TEXT NOT NULL,
            enhancementLevel INTEGER NOT NULL DEFAULT 0,
            category TEXT NOT NULL,
            subCategory TEXT UNIQUE,
            mounted INTEGER NOT NULL DEFAULT 0,
            altarionPoints INTEGER NOT NULL DEFAULT 0
        );
    """)

    conn.commit()
    conn.close()



@app.route('/api/items')
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

@app.route('/api/items/buy', methods=['POST'])
def buy_item():
    item = request.get_json()
    conn = create_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("INSERT INTO Inventory (id, name, icon, category, subCategory) VALUES (?, ?, ?, ?, ?)",
                       (item['id'], item['name'], item['icon'], item['category'], item['subCategory']))
        conn.commit()
        return jsonify({"message": "Item purchased successfully"}), 200
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

@app.route('/api/inventory', methods=['GET'])
def get_inventory_items():
    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, icon, enhancementLevel, category, subCategory, mounted, altarionPoints FROM Inventory")
    items = [
        {
            'id': item[0],
            'name': item[1],
            'icon': item[2],
            'enhancementLevel': item[3],
            'category': item[4],
            'subCategory': item[5],
            'mounted': bool(item[6]),
            'altarionPoints': item[7]
        } for item in cursor.fetchall()
    ]
    conn.close()
    return jsonify(items)


@app.route('/api/inventory/enhance', methods=['POST'])
def enhance_item():
    data = request.get_json()
    item_id = data['id']

    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT enhancementLevel, altarionPoints FROM Inventory WHERE id=?", (item_id,))
    item = cursor.fetchone()

    if item:
        enhancement_level = item[0]
        altarion_points = item[1]

        if altarion_points > 0:
            success_rate = 1 if enhancement_level < 3 else 1 - (enhancement_level - 2) * 0.1
            success = (random.random() <= success_rate)

            if success:
                enhancement_level += 1

            cursor.execute("UPDATE Inventory SET enhancementLevel=?, altarionPoints=? WHERE id=?",
                           (enhancement_level, altarion_points - 1, item_id))
            conn.commit()

            response = {
                'success': success,
                'enhancementLevel': enhancement_level,
                'altarionPoints': altarion_points - 1
            }
        else:
            response = {'error': 'Not enough Altarion Points'}

        conn.close()
        return jsonify(response)

    return jsonify({'error': 'Item not found'})


@app.route('/api/inventory/toggle-mount', methods=['POST'])
def toggle_mount():
    data = request.get_json()
    item_id = data['id']

    conn = create_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT mounted FROM Inventory WHERE id=?", (item_id,))
    item = cursor.fetchone()

    if item:
        mounted = bool(item[0])

        cursor.execute("UPDATE Inventory SET mounted=? WHERE id=?", (not mounted, item_id))
        conn.commit()

        response = {
            'mounted': not mounted
        }

        conn.close()
        return jsonify(response)

    return jsonify({'error': 'Item not found'})

@app.route('/api/character-image', methods=['GET'])
def get_character_image():
    items = request.args.get('items', '')
    animation = request.args.get('animation', 'stand1')
    frame = request.args.get('frame', '0')
    #region = request.args.get('region', 'KMST')
    #version = request.args.get('version', '1150')
    skin_id = request.args.get('skin_id', '2000')

    # Convert the items string into a list of dictionaries
    try:
        item_list = json.loads(items)
    except:
        item_list = []

    # Create the items part of the URL
    items_url = ",".join([str(item["itemId"]) for item in item_list])

    base_url = f"https://maplestory.io/api/KMST/1150/Character/"
    image_url = f"{base_url}{skin_id}/{items_url}/{animation}/{frame}"

    return jsonify({"image_url": image_url})


if __name__ == '__main__':
    init_db()
    app.run(debug=True)

