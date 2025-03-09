from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app) 
bcrypt = Bcrypt(app)

# MongoDB setup
client = MongoClient("mongodb+srv://rahulvkokre12:rahul@cluster0.iqhmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['user_db']
users = db['users']

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    role = data.get('userType')
    fullname = data.get('fullName')
    email = data.get('email')
    specialty = data.get('specialty')
    password = data.get('password')

    if not fullname or not password:
        return jsonify({"message": "Username and password are required"})

    # Check if user already exists
    if users.find_one({"fullname": fullname}):
        return jsonify({"message": "User already exists"})

    # Hash password and save the user
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users.insert_one({"role":role, "fullname": fullname, "email":email, "specialty":specialty, "password": hashed_password})

    return jsonify({"message": "success"})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user exists
    user = users.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid credentials"}), 401

    # Return only safe user data (exclude password)
    user_data = {
        "id": str(user['_id']),
        "fullname": user.get('fullname'),
        "email": user.get('email'),
        "role": user.get('role')
    }

    return jsonify(user_data), 200
    
@app.route('/doctors', methods=['GET'])
def get_doctors():
    specialty = request.args.get('specialty', '')

    # Exclude documents with empty specialty and filter by role
    query = {
        "role": "doctor",
        "specialty": {"$ne": ""}
    }

    if specialty:
        query['specialty']['$regex'] = specialty
        query['specialty']['$options'] = 'i'  # Case-insensitive search

    # Fetch necessary fields, including ID, name, and specialty
    doctors = list(db.users.find(query, {"_id": 1, "fullname": 1, "specialty": 1}))

    # Convert ObjectId to string
    for doctor in doctors:
        doctor['_id'] = str(doctor['_id'])

    return jsonify(doctors)

@app.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    doctor_id = data.get('doctor_id')
    patient_id = data.get('patient_id')
    date = data.get('date')
    time = data.get('time')

    if not all([doctor_id, patient_id, date, time]):
        return jsonify({"error": "All fields are required"}), 400

    appointment = {
        "doctor_id": doctor_id,
        "patient_id": patient_id,
        "date": date,
        "time": time,
        "prescription": "",
        "status": "confirmed"
    }
    db.appointments.insert_one(appointment)
    return jsonify({"message": "Appointment booked successfully"}), 201

@app.route('/appointmentList', methods=['GET'])
def get_appointments():
    patient_id = request.args.get('patientId')
    doctor_id = request.args.get('doctorId')

    query = {}
    if patient_id:
        query['patient_id'] = patient_id
    if doctor_id:
        query['doctor_id'] = doctor_id

    appointments = list(db.appointments.find(query))
    print(appointments)
    # Enrich appointments with patient and doctor names
    enriched_appointments = []
    for appointment in appointments:
        appointment['_id'] = str(appointment['_id'])
        appointment['patient_id'] = str(appointment['patient_id'])
        appointment['doctor_id'] = str(appointment['doctor_id'])
        appointment['prescription'] = str(appointment['prescription'])

        # Fetch patient and doctor names
        patient = db.users.find_one({"_id": ObjectId(appointment['patient_id'])}, {"fullname": 1})
        doctor = db.users.find_one({"_id": ObjectId(appointment['doctor_id'])}, {"fullname": 1})

        appointment['patient_name'] = patient['fullname'] if patient else "Unknown"
        appointment['doctor_name'] = doctor['fullname'] if doctor else "Unknown"

        enriched_appointments.append(appointment)

    print(enriched_appointments)

    return jsonify(enriched_appointments)

@app.post("/prescriptions")
def savePrescriptions():
    data = request.json
    appointment_id = data.get('appointmentId')
    prescription_text = data.get('prescriptionText')
    appointment = db.appointments.find_one({"_id": ObjectId(appointment_id)})
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    update_result = db.appointments.update_one(
            {"_id": ObjectId(appointment_id)},
            {"$set": {"prescription": prescription_text}}
        )

    if update_result.modified_count == 1:
        return {"message": "Prescription added successfully"}
    else:
        raise HTTPException(status_code=400, detail="Failed to update prescription")

    return {"message": "Prescription added successfully"}

# Run the app
if __name__ == '__main__':
    app.run(debug=True)