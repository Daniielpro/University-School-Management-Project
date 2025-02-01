from flask import Flask,jsonify,request
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')  #
db = client['User'] 
usuarios_collection = db['user']  


@app.route('/delete/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    print(f"ID recibido: {id}")  # Para depuración
    result = usuarios_collection.delete_one({"id": id})
    
    if result.deleted_count == 0:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
    return jsonify({'message': 'Usuario eliminado exitosamente'}), 200
if __name__ == '__main__':
    app.run(debug=True , port=5003)