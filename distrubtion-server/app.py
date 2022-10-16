from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import database
import network


db = database.Database()
db.clear_table()
net_hand = network.NetworkHandler()
net_hand.sync()
print(net_hand.posts)
db.insert_users_old(net_hand.posts)
app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "<p>hahahah</p>"

@app.route("/get-comments", methods=['POST'])
def get_comments():
    json = request.get_json()
    print(json)
    comments = db.get_comments(json["url"]) 
    Response = jsonify(comments)
    Response.headers.add('Access-Control-Allow-Origin', '*')
    print(Response.get_data)
    return Response

@app.route("/post-comment", methods=['POST'])
def post_comments():
    json = request.get_json()
    print(json)
    db.insert_user_new(json["url"],json["user_id"],json["content"])
    comments = db.get_comments(json["url"])
    net_hand.sync()
    net_hand.post(comments[-1])
    print(comments)

    Response = jsonify(200)
    Response.headers.add('Access-Control-Allow-Origin', '*')
    return Response


def run():
    app.run(host='192.168.1.5',port=444,ssl_context=('./certs/new_cert.crt', './certs/private.key'),debug=True)
    #app.run(host='0.0.0.0',port=8000)

def main():
    print('----flask test main----')
    run()

if __name__ == '__main__':
    main()
