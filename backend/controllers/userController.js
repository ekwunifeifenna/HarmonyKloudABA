const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const ContactUs = require("../models/contactUs");


router.post("/add-contact-us", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const newContactUs = new ContactUs({
      name,
      phone,
      email,
      message,
    });

    const savedContactUs = await newContactUs.save();

    res.status(200).json(savedContactUs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-users", async (req, res) => {
  try {
    const findUser = await User.find();
    if (!findUser) res.json("No user found");
    res.status(200).json(findUser);
  } catch (error) {}
});

router.put("/profile-update", async (req, res) => {
  const { userId, updatedProfile } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedProfile },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "Success", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ status: "Error", message: error.message });
  }
});

router.get("/get-medications/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  try {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      if (user.medicalHistory && user.medicalHistory.length > 0) {
        res.status(200).json(user.medicalHistory);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/add-medications/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const { name, dosage, frequency } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.medicalHistory.push({
      medications: [{ name, dosage, frequency }],
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/user-profile", async (req, res) => {
  try {
    // Get the user ID from the request, typically from the auth token
    const userId = req.user.id;

    // Find the user in the database
    const user = await User.findById(userId);

    // Send the user data in the response
    res.json(user);
  } catch (error) {
    // If there's an error, send a 500 response
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/add-user", async (req, res) => {
  const {
    //client details
    name,
    email,
    specialization,
    userName,
    phoneNumber,
    dateOfBirth,
    gender,
    address,
    emergencyContact,
    director,
    guardianFullName,
    customClientNumber,
    SSN,

    // primary payer details
    primaryPayer,
    primaryInsuranceID,
    primaryGroupPolicyNumber,
    primaryInsuranceCopayment,
    primaryRelationshipToPatient,
    primaryInsuranceNumberFor837p,
    primaryInsuredFirstName,
    primaryInsuredMiddleName,
    primaryInsuredLastName,
    primaryInsuredGender,
    primaryInsuredAddress,
    primaryInsuredCountry,
    primaryInsuredState,
    primaryInsuredCity,
    primaryInsuredZIP,
    primaryIssuedDateOfBirth,
    primaryInsuredPhoneNumber,
    // secondary payer details
    secondaryPayer,
    secondaryInsuranceID,
    secondaryGroupPolicyNumber,
    secondaryInsuranceCopayment,
    secondaryRelationshipToPatient,
    secondaryInsuranceNumberFor837p,
    secondaryInsuredFirstName,
    secondaryInsuredMiddleName,
    secondaryInsuredLastName,
    secondaryInsuredGender,
    secondaryInsuredAddress,
    secondaryInsuredCountry,
    secondaryInsuredState,
    secondaryInsuredCity,
    secondaryInsuredZIP,
    secondaryIssuedDateOfBirth,
    secondaryInsuredPhoneNumber,
    // Referral, Coordinator, & service details
    referringPhysicianNPI,
    referringPhysicianTaxonomy,
    referringPhysicianMedicaidNumber,
    referringPhysicianFirstName,
    referringPhysicianMiddleName,
    referringPhysicianLastName,
    referringPhysicianPhone,
    referringPhysicianFAX,
    referringPhysicianLastEmail,
    referralExpirationDate,
    MDLicenseNumber,
    serviceLocation,
    startOfServiceAt,
    initialAssessmentAt,
    initialBASPAT,

    //Primary Payer details
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const lastUser = await User.findOne().sort({ userId: -1 });
    let userId;
    if (lastUser) {
      const lastUserId = parseInt(lastUser.userId, 10);
      userId = (lastUserId + 1).toString();
    } else {
      userId = "1";
    }
    const firstemail = email.split("@")[0];
    const password = firstemail + "@123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      userId: userId,
      password: hashedPassword,
      specialization,
      userName,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      emergencyContact,
      director,
      guardianFullName,
      customClientNumber,
      SSN,

      // primary payer details
      primaryPayer,
      primaryInsuranceID,
      primaryGroupPolicyNumber,
      primaryInsuranceCopayment,
      primaryRelationshipToPatient,
      primaryInsuranceNumberFor837p,
      primaryInsuredFirstName,
      primaryInsuredMiddleName,
      primaryInsuredLastName,
      primaryInsuredGender,
      primaryInsuredAddress,
      primaryInsuredCountry,
      primaryInsuredState,
      primaryInsuredCity,
      primaryInsuredZIP,
      primaryIssuedDateOfBirth,
      primaryInsuredPhoneNumber,
      // secondary payer details
      secondaryPayer,
      secondaryInsuranceID,
      secondaryGroupPolicyNumber,
      secondaryInsuranceCopayment,
      secondaryRelationshipToPatient,
      secondaryInsuranceNumberFor837p,
      secondaryInsuredFirstName,
      secondaryInsuredMiddleName,
      secondaryInsuredLastName,
      secondaryInsuredGender,
      secondaryInsuredAddress,
      secondaryInsuredCountry,
      secondaryInsuredState,
      secondaryInsuredCity,
      secondaryInsuredZIP,
      secondaryIssuedDateOfBirth,
      secondaryInsuredPhoneNumber,
      // Referral, Coordinator, & service details
      referringPhysicianNPI,
      referringPhysicianTaxonomy,
      referringPhysicianMedicaidNumber,
      referringPhysicianFirstName,
      referringPhysicianMiddleName,
      referringPhysicianLastName,
      referringPhysicianPhone,
      referringPhysicianFAX,
      referringPhysicianLastEmail,
      referralExpirationDate,
      MDLicenseNumber,
      serviceLocation,
      startOfServiceAt,
      initialAssessmentAt,
      initialBASPAT,
    });

    const savedUser = await newUser.save();

    res.status(200).json({ savedUser, message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

  // const { name, email } = req.body;

  // try {
  //   let user
  //   // let user, doctor, nurse;
  //   // let isPasswordValid = false;

  //    user = await User.findOne({ email });
  //   //  doctor = await Doctor.findOne({ email });
  //   //  nurse = await Nurse.findOne({ email });

  //   // if (user || doctor || nurse) {

  //   //   if (user) {
  //   //     isPasswordValid = await bcrypt.compare(password, user.password);
  //   //   } else if (doctor) {
  //   //     isPasswordValid = await bcrypt.compare(password, doctor.password);
  //   //   } else if (nurse) {
  //   //     isPasswordValid = await bcrypt.compare(password, nurse.password);
  //   //   }

  //   //   if (isPasswordValid) {
  //   //     let token, role, loggedInUser;
  //   //     if (user) {
  //   //       token = jwt.sign({ id: user._id, role: user.role }, process.env.jwtsecret, {
  //   //         expiresIn: "2d",
  //   //       });
  //   //       role = user.role;
  //   //       loggedInUser = user;
  //   //     } else if (doctor) {
  //   //       token = jwt.sign({ id: doctor._id, role: doctor.role }, process.env.jwtsecret, {
  //   //         expiresIn: "2d",
  //   //       });
  //   //       role = doctor.role;
  //   //       loggedInUser = doctor;
  //   //     } else if (nurse) {
  //   //       token = jwt.sign({ id: nurse._id, role: nurse.role }, process.env.jwtsecret, {
  //   //         expiresIn: "2d",
  //   //       });
  //   //       role = nurse.role;
  //   //       loggedInUser = nurse;
  //   //     }
  //   //     res.cookie('token', token);
  //   //     res.json({ status: "Success", token, role, user: loggedInUser });
  //   //   } else {
  //   //     res.status(401).json({ error: "Invalid email or password" });
  //   //   }
  //   // } else {
  //   //   res.status(404).json({ error: "User not found" });
  //   // }
  // } catch (error) {
  //   console.log(error)
  //   res.status(500).json({ error: error.message });
  // }
});

router.delete("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.json({ msg: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
