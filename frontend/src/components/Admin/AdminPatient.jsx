import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import profiePic from "../../assets/human6.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

function AdminPatient() {

  const [patients, setPatients] = useState([]);
  const patientsString = localStorage.getItem("user");


  //user details
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [emergencyContactPhoneNumber, setEmergencyContactPhoneNumber] = useState('');
  const [director, setDirector] = useState([]);
  const [guardianFullName, setGuardianFullName] = useState('');
  const [customClientNumber, setCustomClientNumber] = useState('');
  const [SSN, setSSN] = useState('');

  //primary payer details
  const [primaryPayer, setPrimaryPayer] = useState("");
  const [primaryInsuranceID, setPrimaryInsuranceID] = useState("");
  const [primaryGroupPolicyNumber, setPrimaryGroupPolicyNumber] = useState("");
  const [primaryInsuranceCopayment, setPrimaryInsuranceCopayment] = useState("");
  const [primaryRelationshipToPatient, setPrimaryRelationshipToPatient] = useState("");
  const [primaryInsuranceNumberFor837p, setPrimaryInsuranceNumberFor837p] = useState("");
  const [primaryInsuredFirstName, setPrimaryInsuredFirstName] = useState("");
  const [primaryInsuredMiddleName, setPrimaryInsuredMiddleName] = useState("");
  const [primaryInsuredLastName, setPrimaryInsuredLastName] = useState("");
  const [primaryInsuredGender, setPrimaryPrimaryInsuredGender] = useState("");
  const [primaryInsuredAddress, setPrimaryInsuredAddress] = useState("");
  const [primaryInsuredCountry, setPrimaryInsuredCountry] = useState("");
  const [primaryInsuredState, setPrimaryInsuredState] = useState("");
  const [primaryInsuredCity, setPrimaryInsuredCity] = useState("");
  const [primaryInsuredZIP, setPrimaryInsuredZIP] = useState("");
  const [primaryIssuedDateOfBirth, setPrimaryIssuedDateOfBirth] = useState("");
  const [primaryInsuredPhoneNumber, setPrimaryInsuredPhoneNumber] = useState("");


  //secondary payer details
  const [secondaryPayer, setSecondaryPayer] = useState("");
  const [secondaryInsuranceID, setSecondaryInsuranceID] = useState("");
  const [secondaryGroupPolicyNumber, setSecondaryGroupPolicyNumber] = useState("");
  const [secondaryInsuranceCopayment, setSecondaryInsuranceCopayment] = useState("");
  const [secondaryRelationshipToPatient, setSecondaryRelationshipToPatient] = useState("");
  const [secondaryInsuranceNumberFor837p, setSecondaryInsuranceNumberFor837p] = useState("");
  const [secondaryInsuredFirstName, setSecondaryInsuredFirstName] = useState("");
  const [secondaryInsuredMiddleName, setSecondaryInsuredMiddleName] = useState("");
  const [secondaryInsuredLastName, setSecondaryInsuredLastName] = useState("");
  const [secondaryInsuredGender, setSecondaryInsuredGender] = useState("");
  const [secondaryInsuredAddress, setSecondaryInsuredAddress] = useState("");
  const [secondaryInsuredCountry, setSecondaryInsuredCountry] = useState("");
  const [secondaryInsuredState, setSecondaryInsuredState] = useState("");
  const [secondaryInsuredCity, setSecondaryInsuredCity] = useState("");
  const [secondaryInsuredZIP, setSecondaryInsuredZIP] = useState("");
  const [secondaryIssuedDateOfBirth, setSecondaryIssuedDateOfBirth] = useState("");
  const [secondaryInsuredPhoneNumber, setSecondaryInsuredPhoneNumber] = useState("");

  //Referral, Coordinator, & service details
  const [referringPhysicianNPI, setReferringPhysicianNPI] = useState("");
  const [referringPhysicianTaxonomy, setReferringPhysicianTaxonomy] = useState("");
  const [referringPhysicianMedicaidNumber, setReferringPhysicianMedicaidNumber] = useState("");
  const [referringPhysicianFirstName, setReferringPhysicianFirstName] = useState("");
  const [referringPhysicianMiddleName, setReferringPhysicianMiddleName] = useState("");
  const [referringPhysicianLastName, setReferringPhysicianLastName] = useState("");
  const [referringPhysicianPhone, setReferringPhysicianPhone] = useState("");
  const [referringPhysicianFAX, setReferringPhysicianFAX] = useState("");
  const [referringPhysicianLastEmail, setReferringPhysicianLastEmail] = useState("");
  const [referralExpirationDate, setReferralExpirationDate] = useState(null);
  const [MDLicenseNumber, setMDLicenseNumber] = useState("");
  const [serviceLocation, setServiceLocation] = useState("");
  const [startOfServiceAt, setStartOfServiceAt] = useState(null);
  const [initialAssessmentAt, setInitialAssessmentAt] = useState(null);
  const [initialBASPAT, setInitialBASPAT] = useState(null);
  const [coordinatorApprovalAt, setCoordinatorApprovalAt] = useState(null);
  const [coordinatorFullName, setCoordinatorFullName] = useState("");
  const [coordinatorEmail, setCoordinatorEmail] = useState("");
  const [coordinatorPhoneNumber, setCoordinatorPhoneNumber] = useState("");
  const [supportPlanAt, setSupportPlanAt] = useState(null);
  const [weeklyBCBABCaBAAnalystHours, setWeeklyBCBABCaBAAnalystHours] = useState("");
  const [weeklyRBTAssistantHours, setWeeklyRBTAssistantHours] = useState("");
  const [terminationDate, setTerminationDate] = useState(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/user/get-users"
        );
        setPatients(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Fetching Data!",
        });
      }
    };

    fetchData();
  }, []);

  if (!patients) {
    return <Loader />;
  }

  const handleAddPatient = async (e) => {
    e.preventDefault();
    await axios.post("/user/add-user", {

      //Client details

      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      gender: gender,
      address: {
        street: street,
        city:city,
        state: state,
        zipCode: zipCode,
      },
      emergencyContact: {
        name: emergencyContactName,
        relationship: relationship,
        phoneNumber: emergencyContactPhoneNumber,
      },
      director: director,
      guardianFullName: guardianFullName,
      customClientNumber: customClientNumber,
      SSN: SSN,
  
      // primary payer details
      primaryPayer: primaryPayer,
      primaryInsuranceID: primaryInsuranceID,
      primaryGroupPolicyNumber: primaryGroupPolicyNumber,
      primaryInsuranceCopayment: primaryInsuranceCopayment,
      primaryRelationshipToPatient: primaryRelationshipToPatient,
      primaryInsuranceNumberFor837p: primaryInsuranceNumberFor837p,
      primaryInsuredFirstName: primaryInsuredFirstName,
      primaryInsuredMiddleName: primaryInsuredMiddleName,
      primaryInsuredLastName: primaryInsuredLastName,
      primaryInsuredGender: primaryInsuredGender,
      primaryInsuredAddress: primaryInsuredAddress,
      primaryInsuredCountry: primaryInsuredCountry,
      primaryInsuredState: primaryInsuredState,
      primaryInsuredCity: primaryInsuredCity,
      primaryInsuredZIP: primaryInsuredZIP,
      primaryIssuedDateOfBirth: primaryIssuedDateOfBirth,
      primaryInsuredPhoneNumber: primaryInsuredPhoneNumber,

      // secondary payer details
      secondaryPayer: secondaryPayer,
      secondaryInsuranceID: secondaryInsuranceID,
      secondaryGroupPolicyNumber: secondaryGroupPolicyNumber,
      secondaryInsuranceCopayment: secondaryInsuranceCopayment,
      secondaryRelationshipToPatient: secondaryRelationshipToPatient,
      secondaryInsuranceNumberFor837p: secondaryInsuranceNumberFor837p,
      secondaryInsuredFirstName: secondaryInsuredFirstName,
      secondaryInsuredMiddleName: secondaryInsuredMiddleName,
      secondaryInsuredLastName: secondaryInsuredLastName,
      secondaryInsuredGender: secondaryInsuredGender,
      secondaryInsuredAddress: secondaryInsuredAddress,
      secondaryInsuredCountry: secondaryInsuredCountry,
      secondaryInsuredState: secondaryInsuredState,
      secondaryInsuredCity: secondaryInsuredCity,
      secondaryInsuredZIP: secondaryInsuredZIP,
      secondaryIssuedDateOfBirth: secondaryIssuedDateOfBirth,
      secondaryInsuredPhoneNumber: secondaryInsuredPhoneNumber,

      // Referral, Coordinator, & service details
      referringPhysicianNPI: referringPhysicianNPI,
      referringPhysicianTaxonomy: referringPhysicianTaxonomy,
      referringPhysicianMedicaidNumber: referringPhysicianMedicaidNumber,
      referringPhysicianFirstName: referringPhysicianFirstName,
      referringPhysicianMiddleName: referringPhysicianMiddleName,
      referringPhysicianLastName: referringPhysicianLastName,
      referringPhysicianPhone: referringPhysicianPhone,
      referringPhysicianFAX: referringPhysicianFAX,
      referringPhysicianLastEmail: referringPhysicianLastEmail,
      referralExpirationDate: referralExpirationDate,
      MDLicenseNumber: MDLicenseNumber,
      serviceLocation: serviceLocation,
      startOfServiceAt: startOfServiceAt,
      initialAssessmentAt: initialAssessmentAt,
      initialBASPAT: initialBASPAT,
      coordinatorApprovalAt: coordinatorApprovalAt,
      coordinatorFullName: coordinatorFullName,
      coordinatorEmail: coordinatorEmail,
      coordinatorPhoneNumber: coordinatorPhoneNumber,
      supportPlanAt: supportPlanAt,
      weeklyBCBABCaBAAnalystHours: weeklyBCBABCaBAAnalystHours,
      weeklyRBTAssistantHours: weeklyRBTAssistantHours,
      terminationDate: terminationDate,
    }).then((res) => {
      if (res.data.message === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Patient Added Successfully!",
        });
      }

    }).catch((e) => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Error Adding Client!",
      });
    })
  };

  const [isCreate, setIsCreate] = useState(false);

  const editPatient = async (id) => {
    await axios
      .put(`/user/update-user/${id}`, {})
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Updated Successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "warning",
          text: "Could not update Doctor!",
        });
      });
  };

  const deletePatient = async (id) => {
    await axios
      .delete(`/user/delete-user/${id}`,)
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Patient Deleted Successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Deleting Patient!",
        });
      });
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
  };

  const handleGoBack = () => {
    setIsCreate(!isCreate);
  };





  // const [users, setUsers] = useState([]);





  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-full w-full bg-white shadow-xl p-2 flex">
        <AdminSidebar userName={"Admin"} profiePic={profiePic} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 ">
          <p className="font-semibold text-3xl">Clients</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Role
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(patients) &&
                    patients.map((item, index) => (
                      <tr key={item._id} className="text-black">
                        <td scope="col" className="px-3 py-4">
                          {index + 1}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.userName}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.email}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.role}
                        </td>
                        <td scope="col" className="d-flex gap-3 ">


                          <button
                            onClick={() => {
                              deletePatient(item._id);
                            }}
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="bg-[#238888] p-2 w-[10%] rounded-full hover:scale-110 duration-200 active:scale-90  text-white"
          >
            Create
          </button>
        </div>



        {isCreate && (
          <div className="absolute h-full w-full z-50 bg-white overflow-auto  ">
            
            <form className="flex flex-col w-full h-full justify-start gap-4 items-center overflow-auto">
            <h1 className='font-bold text-2xl'>New Client</h1>
              <h3 className='font-bold'>Client Details</h3>
              <hr className="border-t-2 border-gray-600"/>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter User Name:</p>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="User Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Email:</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Phone Number:</p>
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Phone Number"
                ></input>
              </div>



              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Date Of Birth:</p>
                <input
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Date Of Birth"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Gender:</p>
                <input
                  onChange={(e) => setGender(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Gender"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Street:</p>
                <input
                  onChange={(e) => setStreet(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Street"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter State:</p>
                <input
                  onChange={(e) => setState(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="City"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter City:</p>
                <input
                  onChange={(e) => setCity(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="City"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Zip Code :</p>
                <input
                  onChange={(e) => setZipCode(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="State"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Emergency Contact Name:</p>
                <input
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Emergency Contact Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Relationship:</p>
                <input
                  onChange={(e) => setRelationship(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Relationship"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Emergency Contact Phone Number:</p>
                <input
                  onChange={(e) => setEmergencyContactPhoneNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Emergency Contact Phone Number"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Director:</p>
                <input
                  onChange={(e) => setDirector(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Director"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Guardian Full Name:</p>
                <input
                  onChange={(e) => setGuardianFullName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Guardian Full Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Custom Client Number:</p>
                <input
                  onChange={(e) => setCustomClientNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Custom Client Number"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter SSN:</p>
                <input
                  onChange={(e) => setSSN(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="SSN"
                ></input>
              </div>



              <h3 className='font-bold'>Primry Payer Details</h3>
              <hr className="border-t-2 border-gray-600"/>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Payer:</p>
                <input
                  onChange={(e) => setPrimaryPayer(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Payer"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insurance ID:</p>
                <input
                  onChange={(e) => setPrimaryInsuranceID(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insurance ID"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Group Policy Number:</p>
                <input
                  onChange={(e) => setPrimaryGroupPolicyNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Group Policy Number"
                ></input>
              </div>



              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insurance Copayment:</p>
                <input
                  onChange={(e) => setPrimaryInsuranceCopayment(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insurance Copayment"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Relationship To Patient:</p>
                <input
                  onChange={(e) => setPrimaryRelationshipToPatient(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Relationship To Patient"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insurance Number For 837p:</p>
                <input
                  onChange={(e) => setPrimaryInsuranceNumberFor837p(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insurance Number For 837p"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured First Name:</p>
                <input
                  onChange={(e) => setPrimaryInsuredFirstName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured First Name"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter primary Insured Middle Name:</p>
                <input
                  onChange={(e) => setPrimaryInsuredMiddleName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="primary Insured Middle Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured Last Name:</p>
                <input
                  onChange={(e) => setPrimaryInsuredLastName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured Last Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured Gender:</p>
                <input
                  onChange={(e) => setPrimaryPrimaryInsuredGender(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured Gender"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured Address:</p>
                <input
                  onChange={(e) => setPrimaryInsuredAddress(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured Address"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured Country:</p>
                <input
                  onChange={(e) => setPrimaryInsuredCountry(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured Country"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured State:</p>
                <input
                  onChange={(e) => setPrimaryInsuredState(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured State"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured City:</p>
                <input
                  onChange={(e) => setPrimaryInsuredCity(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured City"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured ZIP:</p>
                <input
                  onChange={(e) => setPrimaryInsuredZIP(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured ZIP"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Issued Date Of Birth:</p>
                <input
                  onChange={(e) => setPrimaryIssuedDateOfBirth(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Primary Issued Date Of Birth"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Primary Insured Phone Number:</p>
                <input
                  onChange={(e) => setPrimaryInsuredPhoneNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Primary Insured Phone Number"
                ></input>
              </div>




              <h3 className='font-bold'>Secondary Payer Details</h3>
              <hr className="border-t-2 border-gray-600"/>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Payer:</p>
                <input
                  onChange={(e) => setSecondaryPayer(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Payer"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insurance ID:</p>
                <input
                  onChange={(e) => setSecondaryInsuranceID(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insurance ID"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Group Policy Number:</p>
                <input
                  onChange={(e) => setSecondaryGroupPolicyNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Group Policy Number"
                ></input>
              </div>



              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insurance Copayment:</p>
                <input
                  onChange={(e) => setSecondaryInsuranceCopayment(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insurance Copayment"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Relationship To Patient:</p>
                <input
                  onChange={(e) => setSecondaryRelationshipToPatient(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Relationship To Patient"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insurance Number For 837p:</p>
                <input
                  onChange={(e) => setSecondaryInsuranceNumberFor837p(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insurance Number For 837p"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured First Name:</p>
                <input
                  onChange={(e) => setSecondaryInsuredFirstName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured First Name"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Middle Name:</p>
                <input
                  onChange={(e) => setSecondaryInsuredMiddleName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Middle Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Last Name:</p>
                <input
                  onChange={(e) => setSecondaryInsuredLastName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Last Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Gender:</p>
                <input
                  onChange={(e) => setSecondaryInsuredGender(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Gender"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Address:</p>
                <input
                  onChange={(e) => setSecondaryInsuredAddress(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Address"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Country:</p>
                <input
                  onChange={(e) => setSecondaryInsuredCountry(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Country"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured State:</p>
                <input
                  onChange={(e) => setSecondaryInsuredState(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured State"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured City:</p>
                <input
                  onChange={(e) => setSecondaryInsuredCity(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured City"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured ZIP:</p>
                <input
                  onChange={(e) => setSecondaryInsuredZIP(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured ZIP"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Issued Date Of Birth:</p>
                <input
                  onChange={(e) => setSecondaryIssuedDateOfBirth(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Secondary Issued Date Of Birth"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Secondary Insured Phone Number:</p>
                <input
                  onChange={(e) => setSecondaryInsuredPhoneNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Secondary Insured Phone Number"
                ></input>
              </div>






              <h3 className='font-bold'>Referral, Coordinator, & service details</h3>
              <hr className="border-t-2 border-gray-600"/>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician NPI:</p>
                <input
                  onChange={(e) => setReferringPhysicianNPI(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician NPI"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Taxonomy:</p>
                <input
                  onChange={(e) => setReferringPhysicianTaxonomy(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician Taxonomy"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Medicaid Number:</p>
                <input
                  onChange={(e) => setReferringPhysicianMedicaidNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Referring Physician Medicaid Number"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician First Name:</p>
                <input
                  onChange={(e) => setReferringPhysicianFirstName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician First Name"
                ></input>
              </div>



              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Middle Name:</p>
                <input
                  onChange={(e) => setReferringPhysicianMiddleName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician Middle Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Last Name:</p>
                <input
                  onChange={(e) => setReferringPhysicianLastName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician Last Name"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Phone:</p>
                <input
                  onChange={(e) => setReferringPhysicianPhone(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician Phone"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician FAX:</p>
                <input
                  onChange={(e) => setReferringPhysicianFAX(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician FAX"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referring Physician Email:</p>
                <input
                  onChange={(e) => setReferringPhysicianLastEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Referring Physician Email"
                ></input>
              </div>

              


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Referral Expiration Date:</p>
                <input
                  onChange={(e) => setReferralExpirationDate(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Referral Expiration Date"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter MD License Number:</p>
                <input
                  onChange={(e) => setMDLicenseNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="MD License Number"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter service Location:</p>
                <input
                  onChange={(e) => setServiceLocation(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="service Location"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Start Of Service At:</p>
                <input
                  onChange={(e) => setStartOfServiceAt(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Start Of Service At"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Initial Assessment At:</p>
                <input
                  onChange={(e) => setInitialAssessmentAt(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Initial Assessment At"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Initial BASP AT:</p>
                <input
                  onChange={(e) => setInitialBASPAT(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Initial BASP AT"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Coordinator Approval At:</p>
                <input
                  onChange={(e) => setCoordinatorApprovalAt(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Coordinator Approval At"
                ></input>
              </div>

           
              

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Coordinator Full Name:</p>
                <input
                  onChange={(e) => setCoordinatorFullName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Coordinator Full Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Coordinator Email:</p>
                <input
                  onChange={(e) => setCoordinatorEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Coordinator Email"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Coordinator Phone Number:</p>
                <input
                  onChange={(e) => setCoordinatorPhoneNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Coordinator Phone Number"
                ></input>
              </div>
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Support Plan At:</p>
                <input
                  onChange={(e) =>  setSupportPlanAt(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="Support Plan At"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Weekly BCBA / BCaBA Analyst Hours:</p>
                <input
                  onChange={(e) => setWeeklyBCBABCaBAAnalystHours(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Weekly BCBA / BCaBA Analyst Hours"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Weekly RBT Assistant Hours:</p>
                <input
                  onChange={(e) => setWeeklyRBTAssistantHours(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Weekly RBT Assistant Hours"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Termination Date:</p>
                <input
                  onChange={(e) => setTerminationDate(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Enter Termination Date"
                ></input>
              </div>




              <button onClick={handleAddPatient} className=" w-[35%] bg-[#238888] text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90">
                Add Client
              </button>

              <button
                onClick={handleGoBack}
                className="bg-[#238888] text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-105 duration-200 active:scale-90"
              >
                {"<- Go back"}
              </button>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
export default AdminPatient;
