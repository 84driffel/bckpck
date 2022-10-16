import psycopg2

class Database:
    def __init__(self):
        try:
            print('Attemping database connection')
            self.conn = psycopg2.connect(
                     host="localhost",
                     database="comments",
                     user="postgres",
                     password="postgres")
            print('Database connected.')
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def clear_table(self):
           cur = self.conn.cursor()
           cur.execute("TRUNCATE TABLE comments;")
           self.conn.commit()
           cur.close()

    def get_comments(self, url):
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM comments WHERE url = '" + url +  "';")
        result = cur.fetchall()
        print(result)
        cur.close()
        return result
    
    def insert_user(self, url, user_id, content, comment_id):
           cur = self.conn.cursor()
           cur.execute("INSERT INTO comments (url, user_id, content, comment_id) VALUES ('" + url + "','" + user_id + "','" + content + "','" + comment_id +"');")
           self.conn.commit()
           cur.close()

    def insert_user_new(self, url, user_id, time, content, comment_id):
           cur = self.conn.cursor()
           cur.execute("INSERT INTO comments VALUES ('" + url + "','" + user_id + "', '" + time + "','" + content + "','" + comment_id +"');")
           self.conn.commit()
           cur.close()

    def insert_user_new(self, posts):
        self.clear_table()
        for post in posts:
           cur = self.conn.cursor()
           cur.execute("INSERT INTO comments VALUES ('" + url + "','" + user_id + "', '" + time + "','" + content + "','" + comment_id +"');")
           self.conn.commit()
           cur.close()

def main():
    print('----database main----')
    db = Database()
    print(db.get_comments('rbGlq8lSfmg'))
    #db.insert_user("rbGlq8lSfmg", "MattK", "Daniel is the worse.", "5ABCQRN")
    #db.clear_table()

if __name__ == '__main__':
    main()
