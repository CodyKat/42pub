import sqlite3
import os
from sqlite3 import Error

DATABASE = "inventory.db"

def create_connection():
	conn = None
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
		CREATE TABLE IF NOT EXISTS item_list (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL,
			description TEXT,
			typeInfo TEXT,
			subCategory TEXT,
			isCash INTEGER NOT NULL DEFAULT 0,
			icon TEXT NOT NULL
		);
	""")


	cursor.execute("""
		CREATE TABLE IF NOT EXISTS Users (
			id INTEGER PRIMARY KEY,
			username TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
	""")

	cursor.execute("""
		CREATE TABLE IF NOT EXISTS Inventory (
			id INTEGER PRIMARY KEY,
			user_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			icon TEXT NOT NULL,
			enhancementLevel INTEGER NOT NULL DEFAULT 0,
			category TEXT NOT NULL,
			subCategory TEXT,
			mounted INTEGER NOT NULL DEFAULT 0,
			altarionPoints INTEGER NOT NULL DEFAULT 0,
			FOREIGN KEY (user_id) REFERENCES Users (id)
		);
	""")

	cursor.execute("""
		CREATE TABLE IF NOT EXISTS Showroom (
			id INTEGER PRIMARY KEY,
			user_id INTEGER NOT NULL,
			name TEXT NOT NULL,
			icon TEXT NOT NULL,
			enhancementLevel INTEGER NOT NULL DEFAULT 0,
			category TEXT NOT NULL,
			subCategory TEXT UNIQUE,
			mounted INTEGER NOT NULL DEFAULT 0,
			altarionPoints INTEGER NOT NULL DEFAULT 0,
			FOREIGN KEY (user_id) REFERENCES Users (id)
		);
	""")

	cursor.execute("""
		CREATE TABLE IF NOT EXISTS Subjects (
			id INTEGER PRIMARY KEY,
			name TEXT NOT NULL UNIQUE,
			pdf TEXT NOT NULL
		);
	""")

	# Add the PDF files from the specified directory to the Subjects table
	pdf_directory = "/Users/kwak/42pub/react_ekwak/ekwak/public/subject"
	
	if os.path.exists(pdf_directory):
		for filename in os.listdir(pdf_directory):
			if filename.endswith(".pdf"):
				subject_name = os.path.splitext(filename)[0]
				pdf_path = os.path.join(pdf_directory, filename)

				try:
					cursor.execute("INSERT OR IGNORE INTO Subjects (name, pdf) VALUES (?, ?)", (subject_name, pdf_path))
				except Error as e:
					print(f"Error adding PDF file {filename} to the Subjects table: {e}")
	else:
		print(f"PDF directory {pdf_directory} does not exist")

	conn.commit()
	conn.close()
