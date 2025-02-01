from flask import Flask,jsonify,request
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')  #
db = client['User'] 
usuarios_collection = db['user']  


@app.route('/user/<int:id>', methods=['GET'])
def obtener_usuarios(id):
    usuario = usuarios_collection.find_one({"id":id})
    if usuario:
        usuario["_id"] = str(usuario["_id"])  # Convertir ObjectId a string para evitar errores en JSON
        return jsonify(usuario), 200
    else:
        return jsonify({"error": "Usuario no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True , port=5005)