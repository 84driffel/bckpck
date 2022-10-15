from flask import Flask

app = Flask(__name__)
list = ["192.168.1.1", "192.168.1.1"]

@app.route("/")
def index():
    return "<p>hahahah</p>"

@app.route("/node", methods=['GET'])
def node():
    return list[1]