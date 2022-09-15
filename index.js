class Patient {
    constructor(id, name, age, phone, record) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.phone = phone;
      this.record = record;
    }
  }
  
  let patient = [];
  let counter = 1;
  const tablePatient = document.querySelector("#patientTable tbody");
  const PatientForm = document.querySelector("#addPatient");
  updatePatientTable();
  
  function savePatient() {
     console.log(PatientForm.idPerson);
     if (PatientForm.idPerson && PatientForm.idPerson != 0) {
       for (let index = 0; index < Patient.length; index++) {
         if (Patient[index].id == PatientForm.idPerson) {
          Patient[index].name = PatientForm.PatientName.value;
          Patient[index].age = PatientForm.PatientAge.value;
          Patient[index].phone = PatientForm.PatientPhone.value;
          Patient[index].record = PatientForm.PatientRecord.value;
          break;
        }
      }
      PatientForm["idPerson"] = 0;
      updatePatientTable();
    } else {
      //crear
      const newPatient = new Patient(
        counter,
        PatientForm.PatientName.value,
        PatientForm.PatientAge.value,
        PatientForm.PatientPhone.value,
        PatientForm.PatientRecord.value
      );
      patient.push(newPatient);
      counter++;
      updatePatientTable();
    }
  }
  
  function updatePatientTable() {
    tablePatient.innerHTML = "";
    console.log(patient);
    patient.forEach((person) => {
      const personHTML = document.createElement("tr");
      personHTML.innerHTML = `<th scope="row">${person.id}</th>
          <td>${person.name}</td>
          <td>${person.age}</td>
          <td>${person.phone}</td>
          <td>${person.record}</td>
          <td><button
                  id="editBtn_${person.id}"
                  type="button"
                  class="btn btn-primary"
                  onclick="editPatient(event)"
                  data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >
                  Editar
                  </button>
              <button
                  id="deleteBtn_${person.id}"
                  type="button"
                  class="btn btn-danger"
                  onclick="deletePatient(event)">
                  Borrar
                  </button>
              </td>
          `;
      tablePatient.appendChild(personHTML);
    });
  }
  
  function deletePatient(event) {
    const btn = event.target;
    const id = btn.id.split("_")[1];
    patient = patient.filter((person) => person.id != id);
    updatePatientTable();
  }
  
  function editPatient(event) {
    const btn = event.target;
    const id = btn.id.split("_")[1];
    const persona = Patient.filter((person) => person.id == id)[0];
    PatientForm.PatientName.value = persona.name;
    PatientForm.PatientAge.value = persona.age;
    PatientForm.PatientPhone.value = persona.phone;
    PatientForm.PatientRecord.value = persona.record;
    PatientForm["idPerson"] = persona.id;
    console.dir(PatientForm);
  }
  