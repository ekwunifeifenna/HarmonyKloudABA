const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneno: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,

  },
  gender: {
    type: String,
  },
  address: {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    street: {
      type: String,
    },
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  taxType: {
    type: Array,
    // required: [true, 'Please enter your tax type'],
  },
  therapistType: {
    type: Array,
    required: [true, 'Please enter your therapist type'],
  },
  therapistLevel: {
    type: String,
    // required: [true, 'Please enter your therapist level'],
  },
  companyName: {
    type: String,
    // required: [true, 'Please enter your company name'],
  },
  fein: {
    type: String,
    // required: [true, 'Please enter your fein'],
  },
  npi: {
    type: String,
    // required: [true, 'Please enter your npi'],
  },
  providerID: {
    type: String,
    // required: [true, 'Please enter your provider id'],
  },
  stateLicenseNumber: {
    type: String,
    // required: [true, 'Please enter your state license number'],
  },
  caqhID: {
    type: String,
    // required: [true, 'Please enter your caqh id'],
  },
  education: {
    type: Array,
    // required: [true, 'Please enter your education'],
  },
  ssn: {
    type: String,
    // required: [true, 'Please enter your ssn'],
  },
  languages: {
    type: [String],
    // required: [true, 'Please enter your languages'],
  },
  ssn: {
    type: String,
    // required: [true, 'Please enter your ssn'],
  },
  languages: {
    type: [String],
    // required: [true, 'Please enter your languages'],
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "nurse", "receptionist", "patient"],
    default: "doctor",
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema, "doctors");
module.exports = Doctor;
