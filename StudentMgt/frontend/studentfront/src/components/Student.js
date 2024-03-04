import axios from "axios";
import { useEffect, useState } from "react";
import './style.css';

function Student() {

  const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactPerson, setContactperson] = useState("");
    const [contactNo, setContactno] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [age, setAge] = useState("");
    const [classroom, setClassroom] = useState("");
    const [students, setStudents] = useState([]);
    const [isValidEmail, setIsValidEmail] = useState(true);

useEffect(() => {
  (async () => await Load())();
}, []);

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
  return regex.test(email);
};

const handleEmailChange = (event) => {
  const { value } = event.target;
  setEmail(value);
  setIsValidEmail(validateEmail(value));
};

async function Load() {
  const result = await axios.get("/api/Student/GetStudent");
  setStudents(result.data);
  
}

async function save(event) {
   
  event.preventDefault();

  if (!isValidEmail) {
    // Email is not valid, show error message and return
    alert('Please enter a valid Gmail address.');
    return;
  }

  try {
    await axios.post("/api/Student/AddStudent", {
      
      FirstName: firstName,
      LastName: lastName,
      ContactPerson: contactPerson,
      ContactNo: contactNo,
      Email: email,
      Dob: dob,
      Age: age,
      Classroom: classroom
     
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
    setFirstName(students.firstName);
    setLastName(students.lastName);
    setContactperson(students.ContactPerson);
    setContactno(students.ContactNo);
    setEmail(students.Email);
    setDob(students.Dob);
    setAge(students.age);
    setClassroom(students.classroom);
   
  
    setId(students.id);
  }
  
  async function DeleteStudent(id) {
    await axios.delete("/api/Student/DeleteStudent/" + id);
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
    await axios.patch("/api/Student/UpdateStudent/"+ students.find((u) => u.id === id).id || id,
          {
        id:id,
        FirstName: firstName,
        LastName: lastName,
        ContactPerson:contactPerson,
        ContactNo:contactNo,
        Email:email,
        Dob:dob,
        Age:age,
        Classroom:classroom
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
  <form class="form-grid">
  
    <div class="side1">
      <div class="form-group">
        <label for="FirstName">Student First Name</label>
        <input
          type="text"
          class="form-control"
          id="FirstName"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="LastName">Student Last Name</label>
        <input
          type="text"
          class="form-control"
          id="LastName"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="ContactPerson">Contact Person</label>
        <input
          type="text"
          class="form-control"
          id="ContactPerson"
          value={contactPerson}
          onChange={(event) => {
            setContactperson(event.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="ContactNo">Contact No</label>
        <input
          type="text"
          class="form-control"
          id="ContactNo"
          value={contactNo}
          onChange={(event) => {
            setContactno(event.target.value);
          }}
        />
      </div>
    </div>

    <div class="side2">
      <div class="form-group">
        <label for="Email">Email</label>
        <input
          type="email"
          class={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
          id="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div class="form-group">
        <label for="DOB">DOB</label>
        <input
          type="date"
          class="form-control"
          id="DOB"
          value={dob}
          onChange={(event) => {
            setDob(event.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="Age">Age</label>
        <input
          type="number"
          class="form-control"
          id="Age"
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="Classroom">Classroom</label>
        <input
          type="text"
          class="form-control"
          id="Classroom"
          value={classroom}
          onChange={(event) => {
            setClassroom(event.target.value);
          }}
        />
      </div>
    </div>

    <div class="side3">
      <button class="btn btn-primary" onClick={save}>
        Register
      </button>
      <button class="btn btn-warning" onClick={update}>
        Update
      </button>
    </div>
  </form>
</div>



        <br></br>
        <table class="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">Student First Name</th>
              <th scope="col">student Last Name</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Contact No</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Age</th>
              <th scope="col">Classroom</th>
            </tr>
          </thead>
          {students.map(function fn(student) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{student.id} </th>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.contactPerson}</td>
                  <td>{student.contactNo}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.age}</td>
                  <td>{student.classroom}</td>
                  
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
  