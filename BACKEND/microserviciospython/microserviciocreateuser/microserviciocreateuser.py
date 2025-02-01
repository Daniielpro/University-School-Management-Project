from flask import Flask,jsonify,request
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')  #
db = client['User'] 
usuarios_collection = db['user']  


@app.route('/create', methods=['Post'])
def create_user():
    data = request.get_json()

    if 'id' not in data or 'user' not in data or 'password' not in data:
        return jsonify({'error': 'Faltan datos del usuario'}), 400
    
    nuevo_usuario = {
        'id': data['id'],
        'user': data['user'],
        'password': data['password']  
    }
    
    result = usuarios_collection.insert_one(nuevo_usuario)
    nuevo_usuario['_id'] = str(data['id']) 
    
    return jsonify(nuevo_usuario), 201

if __name__ == '__main__':
    app.run(debug=True , port=5001)