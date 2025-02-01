from flask import Flask,jsonify,request
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')  #
db = client['User'] 
usuarios_collection = db['user']  


@app.route('/user', methods=['GET'])
def obtener_usuarios():
    usuarios = list(usuarios_collection.find())
    for usuario in usuarios:
        usuario['_id'] = str(usuario['_id'])  
    return jsonify(usuarios), 200

if __name__ == '__main__':
    app.run(debug=True)