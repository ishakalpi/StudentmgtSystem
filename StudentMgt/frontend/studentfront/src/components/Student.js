import axios from "axios";
import { useEffect, useState } from "react";


function Student() {

const [id, setId] = useState("");
const [stfirstname, setFirstName] = useState("");
const [stlastname, setLastName] = useState("");
const [stcontactperson, setContactperson] = useState("");
const [stcontactno, setContactno] = useState("");
const [stemail, setEmail] = useState("");
const [stDob, setDob] = useState("");
const [stAge, setAge] = useState("");
const [stClassroom, setClassroom] = useState("");
const [students, setStudents] = useState([]);

useEffect(() => {
  (async () => await Load())();
}, []);

async function Load() {
  console.log("fvdfrf");
  const result = await axios.get("https://localhost:7073/api/Student/GetStudent");
  setStudents(result.data);
  console.log(result.data);
}

async function save(event) {
   
  event.preventDefault();
  try {
    await axios.post("https://localhost:7073/api/Student/AddStudent", {
      
      stfirstname: stfirstname,
      stlastname: stlastname,
      stcontactperson:stcontactperson,
      stcontactno:stcontactno,
      stemail:stemail,
      stDob:stDob,
      stAge:stAge,
      stClassroom:stClassroom
     
    });
    alert("Student Registation Successfully");
        setId("");
        setFirstName("");
        setLastName("");
        setContactperson("");
        setContactno("");
        setEmail("");
        setDob("");
        setAge("");
        setClassroom("");
     
    Load();
  } catch (err) {
    alert(err);
  }
}

async function editStudent(students) {
    setFirstName(students.stfirstname);
    setLastName(students.stlastname);
    setContactperson(students.stcontactperson);
    setContactno(students.stcontactno);
    setEmail(students.stemail);
    setDob(students.stDob);
    setAge(students.stAge);
    setClassroom(students.stClassroom);
   
  
    setId(students.id);
  }
  
  async function DeleteStudent(id) {
    await axios.delete("https://localhost:7073/api/Student/DeleteStudent/" + id);
     alert("Student deleted Successfully");
     setId("");
     setFirstName("");
     setLastName("");
     setContactperson("");
     setContactno("");
     setEmail("");
     setDob("");
     setAge("");
     setClassroom("");
     Load();
    }
  
    async function update(event) {
      event.preventDefault();
      try {
    await axios.patch("https://localhost:7073/api/Student/UpdateStudent/"+ students.find((u) => u.id === id).id || id,
          {
        id:id,
        stfirstname: stfirstname,
        stlastname: stlastname,
        stcontactperson:stcontactperson,
        stcontactno:stcontactno,
        stemail:stemail,
        stDob:stDob,
        stAge:stAge,
        stClassroom:stClassroom
          }
        );
        alert("Registation Updated");
        setId("");
        setFirstName("");
        setLastName("");
        setContactperson("");
        setContactno("");
        setEmail("");
        setDob("");
        setAge("");
        setClassroom("");
       
        Load();
      } catch (err) {
        alert(err);
      }
    }

    return (
        <div> 
        <h1>Student Details</h1>
        <div class="container mt-4">
          <form>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="id"
                hidden
                value={id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
              <label>Student First Name</label>
              <input
                type="text"
                class="form-control"
                id="stfirstname"
                value={stfirstname}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <label>Student Last Name</label>
              <input
                type="text"
                class="form-control"
                id="stlastname"
                value={stlastname}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </div>
            <div class="form-group">
              <label>Contact Person </label>
              <input
                type="text"
                class="form-control"
                id="stcontactperson"
                value={stcontactperson}
                onChange={(event) => {
                  setContactperson(event.target.value);
                }}
              />
            </div>
            <div>
              <button class="btn btn-primary mt-4" onClick={save}>
                Register
              </button>
              <button class="btn btn-warning mt-4" onClick={update}>
                Update
              </button>
            </div>
          </form>
        </div>
        <br></br>
        <table class="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">Student Id</th>
              <th scope="col">Student First Name</th>
              <th scope="col">student Last Name</th>
           
   
              <th scope="col">Option</th>
            </tr>
          </thead>
          {students.map(function fn(student) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{student.id} </th>
                  <td>{student.stfirstname}</td>
                  <td>{student.stlastname}</td>
                  
                  <td>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => DeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
  
      </div>
    );
  }
  
  export default Student;
  