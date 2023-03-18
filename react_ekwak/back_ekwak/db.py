import sqlite3

def init_db():
    conn = sqlite3.connect('my_database.db')
    c = conn.cursor()
    # 테이블 생성 및 초기 데이터 입력
    c.execute('''CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT, description TEXT)''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
