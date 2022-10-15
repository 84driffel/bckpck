from flask import Flask

app = Flask(__name__)
list = ["173.24.113.116", "192.168.1.2"]

@app.route("/")
def index():
    return "<p>hahahah</p>"

@app.route("/node/<selection>", methods=['GET'])
def node(selection):
    if(selection == "default"):
        return list[0]
    elif(int(selection) < len(list)):
        return list[int(selection)]
    else:
        return -1