from flask import Flask,jsonify,request
from flask import Blueprint, render_template 


app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=4001)


