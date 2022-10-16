import psycopg2
from datetime import datetime, date
import hashlib

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
        self.hashl = hashlib.new('shake_128')

    def clear_table(self):
           cur = self.conn.cursor()
           cur.execute("TRUNCATE TABLE comments;")
           self.conn.commit()
           cur.close()

    def get_comments(self, url):
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM comments WHERE url = '" + url +  "';")
        result = cur.fetchall()
        cur.close()
        comments = []
        for i in result:
            #print('called')
            comments.append((i[0],i[1],self.convert_time(i[2]),i[3],i[4]))
        return comments
    
    def insert_user_new(self, url, user_id, content):
        cur = self.conn.cursor()
        now = datetime.now()
        dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
        #print("date and time =", dt_string)
        self.hashl.update((url + user_id + str(self.convert_time(now)) + content).encode())
        hash = self.hashl.hexdigest(32) 
        cur.execute("INSERT INTO comments VALUES ('" + url + "','" + user_id + "','" + dt_string + "','" + content + "','" + hash +"');")
        self.conn.commit()
        cur.close()

    def insert_user_old(self, url, user_id, time, content, comment_id):
        time = int(time)
        cur = self.conn.cursor()
        date = datetime.fromtimestamp(time / 1e3) 
        dt_string = date.strftime("%Y/%m/%d %H:%M:%S")
        cur.execute("INSERT INTO comments VALUES ('" + url + "','" + user_id + "', '" + dt_string + "','" + content + "','" + comment_id +"');")
        self.conn.commit()
        cur.close()

    def insert_users_old(self, posts):
        self.clear_table()
        for post in posts:
            self.insert_user_old(post[0],post[1],post[2],post[3],post[4])
    
    def convert_time(self, time):
        seconds = (time-datetime(1970,1,1)).total_seconds()
        return int(seconds)

    def calculate_hash(self, url, user_id, time, content):
        self.hashl.update((url + user_id + str(self.convert_time(time)) + content).encode())
        hash = self.hashl.hexdigest(32) 
        return hash


def main():
    print('----database main----')
    db = Database()
    comments = db.get_comments('rbGlq8lSfmg')
    print(comments)
    #print(db.convert_time(comments[0][2]))
    #### ZPPR protocol implementation ######
    new_date = datetime.fromisoformat('2022-10-15T22:36:40')
    new_date_int = db.convert_time(new_date)
    hash = db.calculate_hash('rbGlq8lSfmg', 'Daniel', new_date, "Matt is the coolest guy.")
    #db.insert_user_new("rbGlq8lSfmg", "Connor", "Daniel is n eh guy.")
    #db.insert_user_old("rbGlq8lSfmg", "Daniel", new_date_int, "Matt is the coolest guy.", hash)
    #db.clear_table()

if __name__ == '__main__':
    main()
