import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import profiePic from "../../assets/human6.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import AdminSidebar from "./AdminSidebar";

function AdminPatient() {

  const [patients, setPatients] = useState([]);
  const patientsString = localStorage.getItem("user");

  const [patientName, setPatientName] = useState("");
  const [patientSpec, setPatientSpecialization] = useState("");
  const [patientEmail, setPatientEmail] = useState("");

  //new stuff added
  const [director, setDirector] = useState("");
  const [guardianFullName, setGuardianFullName] = useState("");
  const [customClientNumber, setCustomClientNumber] = useState("");
  const [ssn, setSsn] = useState("");

  //primary payer details
  const [primaryPayer, setPrimaryPayer] = useState("");
  const [primaryInsuranceID, setInsuranceID] = useState("");
  const [primaryGroupPolicyNumber, setGroupPolicyNumber] = useState("");
  const [primaryInsuranceCopayment, setInsuranceCopayment] = useState("");
  const [primaryRelationshipToPatient, setRelationshipToPatient] = useState("");
  const [primaryInsuranceNumberFor837p, setInsuranceNumberFor837p] = useState("");
  const [primaryInsuredFirstName, setInsuredFirstName] = useState("");
  const [primaryInsuredMiddleName, setInsuredMiddleName] = useState("");
  const [primaryInsuredLastName, setInsuredLastName] = useState("");
  const [primaryInsuredGender, setPrimaryInsuredGender] = useState("");
  const [primaryInsuredAddress, setInsuredAddress] = useState("");
  const [primaryInsuredCountry, setInsuredCountry] = useState("");
  const [primaryInsuredState, setInsuredState] = useState("");
  const [primaryInsuredCity, setInsuredCity] = useState("");
  const [primaryInsuredZIP, setInsuredZIP] = useState("");
  const [primaryIssuedDateOfBirth, setPrimaryIssuedDateOfBirth] = useState("");
  const [primaryInsuredPhoneNumber, setInsuredPhoneNumber] = useState("");


  //secondary payer details 
  const [laguages, setLanguages] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [education, setEducation] = useState("");

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
    await axios.post("/user/add-user",{
        name:patientName,
        specialization:patientSpec,
        email:patientEmail
      }).then((res)=>{
        if(res.data.message === "Success"){
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Patient Added Successfully!",
          });
        }

      }).catch((e)=>{
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Adding Doctor!",
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
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
      <AdminSidebar userName={"Admin"} profiePic={profiePic}/>
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
                      Patient Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Patient Email
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
          <div className="absolute h-[78%] w-[79%] z-50 bg-white">
            <form className="flex flex-col w-full h-full justify-center gap-4 items-center">
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Client Name:</p>
                <input
                  onChange={(e) => setPatientName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Client Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Client Email:</p>
                <input
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Client Specialization:</p>
                <input

                  onChange={(e) => setPatientSpecialization(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Specialization"
                ></input>
              </div>

              <button onClick={ handleAddPatient} className=" w-[35%] bg-[#238888] text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90">
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
