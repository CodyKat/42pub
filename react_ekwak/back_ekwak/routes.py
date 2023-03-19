from flask import jsonify, request, send_from_directory, make_response
import requests
import time
import json
import random
from database import create_connection

CACHE_EXPIRATION_TIME = 3600  # 1 hour
ITEMS_CACHE = None
CACHE_TIMESTAMP = 0

def register_routes(app):
	@app.route('/api/hello')
	def hello():
		return ''

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
		# 기존의 get_items 코드 삽입

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
			# 기존의 buy_item 코드 삽입

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
			# 기존의 get_inventory_items 코드 삽입

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
		# 기존의 enhance_item 코드 삽입

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
			# 기존의 toggle_mount 코드 삽입

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
			# 기존의 get_character_image 코드 삽입

	@app.route('/api/subjects/search', methods=['GET'])
	def search_subjects():
		query = request.args.get('q', '')

		conn = create_connection()
		cursor = conn.cursor()

		cursor.execute("SELECT * FROM Subjects WHERE name LIKE ?", (f"%{query}%",))
		subjects = cursor.fetchall()

		conn.close()

		result = {"subjects": [{"id": s[0], "name": s[1]} for s in subjects]}
		return jsonify(result)
			# 기존의 search_subjects 코드 삽입

	@app.route('/api/subjects/pdf/<int:subject_id>', methods=['GET'])
	def serve_pdf(subject_id):
		conn = create_connection()
		cursor = conn.cursor()

		cursor.execute("SELECT name, pdf FROM Subjects WHERE id=?", (subject_id,))
		subject = cursor.fetchone()

		conn.close()

		if subject:
			subject_name, pdf_path = subject
			pdf_directory = os.path.dirname(pdf_path)
			response = send_from_directory(pdf_directory, os.path.basename(pdf_path), as_attachment=True, mimetype='application/pdf')
			response.headers.set('Content-Disposition', 'attachment', filename=f"{subject_name}.pdf")
			return response

		return jsonify({"error": "PDF file not found"}), 404
			# 기존의 serve_pdf 코드 삽입
