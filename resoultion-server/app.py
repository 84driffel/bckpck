from flask import Flask, jsonify, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
list = ["https://bckpck.xyz", "192.168.1.2", "0.0.0.0"]

@app.route("/")
def index():
    return "<p>hahahah</p>"

@app.route("/node/<selection>", methods=['GET'])
def node(selection):
    if(selection == "default"):
         Response = jsonify({'ip': list})
         Response.headers.add('Access-Control-Allow-Origin', '*')
         print(Response.get_data)
         return Response
    elif(int(selection) < len(list)):
        return list[int(selection)]
    else:
        return '', 200

def run():
    app.run(host='192.168.1.5',port=443,ssl_context=('./certs/new_cert.crt', './certs/private.key'),debug=True)
    #app.run(host='0.0.0.0',port=8000)

def main():
    print('----flask test main----')
    run()

if __name__ == '__main__':
    main()
