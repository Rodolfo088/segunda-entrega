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
  let idEditedPatient = 0;
  const tablePatient = document.querySelector("#patientTable tbody");
  const patientForm = document.querySelector("#addPatient");
  updatePatientTable();
  
  function savePatient() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El paciente ha sido registrado',
      showConfirmButton: false,
      timer: 1500
    })
     if (idEditedPatient != 0) {
       for (let index = 0; index < patient.length; index++) {
         if (patient[index].id == idEditedPatient) {
          patient[index].name = patientForm.PatientName.value;
          patient[index].age = patientForm.PatientAge.value;
          patient[index].phone = patientForm.PatientPhone.value;
          patient[index].record = patientForm.PatientRecord.value;
          break;
        }
      }
      updatePatientTable();
      idEditedPatient = 0;
      
    } else {
      //crear
      const newPatient = new Patient(
        counter,
        patientForm.PatientName.value,
        patientForm.PatientAge.value,
        patientForm.PatientPhone.value,
        patientForm.PatientRecord.value
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
    Swal.fire({
      title: 'Estas Seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
       const btn = event.target;
    const id = btn.id.split("_")[1];
    patient = patient.filter((person) => person.id != id);
    updatePatientTable(); 
        Swal.fire(
          'Eliminado!',
          'Su paciente ha sido eliminado',
          'success'
        )
      }
    })
    
  }
  
  function editPatient(event) {
    const btn = event.target;
    const id = btn.id.split("_")[1];
    const persona = patient.filter((person) => person.id == id)[0];
    patientForm.PatientName.value = persona.name;
    patientForm.PatientAge.value = persona.age;
    patientForm.PatientPhone.value = persona.phone;
    patientForm.PatientRecord.value = persona.record;
    idEditedPatient = persona.id;
    console.dir(patientForm);
  }
  