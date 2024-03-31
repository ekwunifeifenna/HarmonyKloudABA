import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import profiePic from "../../assets/human6.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader";
import AdminSidebar from "./AdminSidebar";

function AdminDoctor() {
  const [doctors, setDoctors] = useState([]);
  const userString = localStorage.getItem("user");

  const [docname, setDocName] = useState("");
  const [docspec, setDocSpecialization] = useState("");
  const [docemail, setDocEmail] = useState("");
  const [taxType, setTaxType] = useState("");
  const [therapistType, setTherapistType] = useState("");
  const [therapistLevel, setTherapistLevel] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fein, setFein] = useState("");
  const [npi, setNpi] = useState("");
  const [providerID, setProviderID] = useState("");
  const [stateLicenseNumber, setStateLicenseNumber] = useState("");
  const [caqhID, setCaqhID] = useState("");
  const [ssn, setSsn] = useState("");
  const [laguages, setLanguages] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [education, setEducation] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/doctor/get-doctors"
        );
        setDoctors(response.data);
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

  if (!doctors) {
    return <Loader />;
  }

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    await axios.post("/doctor/add-doctor", {
      name: docname,
      specialization: docspec,
      email: docemail,
      taxType: taxType,
      therapistType: therapistType,
      therapistLevel: therapistLevel,
      companyName: companyName,
      fein: fein,
      npi: npi,
      providerID: providerID,
      stateLicenseNumber: stateLicenseNumber,
      caqhID: caqhID,
      ssn: ssn,
      languages: laguages,
      hireDate: hireDate,
      education: education


    }).then((res) => {
      if (res.data.message === "Success") {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Added Successfully!",
        });
      }

    }).catch((e) => {
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
      .put(`/doctor/update-doctor/${id}`, {})
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
      .delete(`/doctor/delete-doctor/${id}`,)
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

  return (
    <section className="bg-slate-300 flex justify-center items-center">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex ">
        <AdminSidebar userName={"Admin"} profiePic={profiePic} />
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 ">
          <p className="font-semibold text-3xl">Therapists</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctors &&
                    doctors.map((item, index) => (
                      <tr key={item._id} className="text-black">
                        <td scope="col" className="px-6 py-3">
                          {item.doctorId}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.name}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.email}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.specialization}
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
          <div className="absolute  h-[80%] w-[80%] z-50 bg-white overflow-auto pt-12">
            <form className="flex flex-col w-full h-full justify-center gap-4 items-center">
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Therapist Name:</p>
                <input
                  onChange={(e) => setDocName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Doctor Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Therapist Email:</p>
                <input
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Therapist Specialization:</p>
                <input

                  onChange={(e) => setDocSpecialization(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Specialization"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter tax Type:</p>
                <input

                  onChange={(e) => setTaxType(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="tax type"
                ></input>
              </div>


              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter therapist Type:</p>
                <input

                  onChange={(e) => setTherapistType(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="therapist type"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter therapist Level:</p>
                <input

                  onChange={(e) => setTherapistLevel(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="therapist level"
                ></input>
              </div>
              {/* 
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter company Name:</p>
                <input

                  onChange={(e) => setCompanyName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="company name"
                ></input>
              </div> */}

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter fein:</p>
                <input

                  onChange={(e) => setFein(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="fein"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter npi:</p>
                <input

                  onChange={(e) => setNpi(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="npi"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter provider ID:</p>
                <input

                  onChange={(e) =>  setProviderID(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="provider ID"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter state License Number:</p>
                <input

                  onChange={(e) =>  setStateLicenseNumber(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="State License Number"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter caqhID:</p>
                <input

                  onChange={(e) =>  setCaqhID(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="caqh ID"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter ssn:</p>
                <input

                  onChange={(e) =>  setSsn(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="ssn"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter laguages:</p>
                <input

                  onChange={(e) =>  setLanguages(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="languages"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter hire Date:</p>
                <input

                  onChange={(e) =>  setHireDate(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="date"
                  placeholder="hire date"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter education:</p>
                <input

                  onChange={(e) =>  setEducation(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="education"
                ></input>
              </div>

              <button onClick={handleAddDoctor} className=" w-[35%] bg-[#238888] text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90">
                Add Doctor
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

export default AdminDoctor;
