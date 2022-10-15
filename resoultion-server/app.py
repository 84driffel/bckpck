from flask import Flask

app = Flask(__name__)
list = ["173.24.113.116", "192.168.1.2"]

@app.route("/")
def index():
    return "<p>hahahah</p>"

@app.route("/node", methods=['GET'])
def node():
    return list[0]