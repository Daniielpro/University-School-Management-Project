from flask import Flask,jsonify,request
from pymongo import MongoClient
from bson import ObjectId
app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')  
db = client['User'] 
usuarios_collection = db['user']  

@app.route('/update', methods=['POST'])
def actualizar_usuario():
    data = request.get_json()
    print(data)
    if 'id' not in data or 'user' not in data or 'password' not in data:
        return jsonify({'error': 'Faltan datos del usuario'}), 400
    
    # Crear un diccionario con los campos a actualizar

    update_fields = {}
    if 'id' in data:
        update_fields['id'] = data['id']
    if 'user' in data:
        update_fields['user'] = data['user']
    if 'password' in data:
        update_fields['password'] = data['password']  # Considera encriptar la contraseña en una aplicación real
    
    # Actualizar el usuario en la colección
    id=int(data['id'])
    print(id)
    result = usuarios_collection.update_one({'id': id}, {'$set': update_fields})
    
    if result.matched_count == 0:
        return jsonify({'error': 'Usuario no encontrado'}), 404
    
    return jsonify({'message': 'Usuario actualizado exitosamente'}), 200

if __name__ == '__main__':
    app.run(debug=True , port=5004)