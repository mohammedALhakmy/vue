<template>
  <div className="container">
    <div className="card" class=" mt-5">
      <div className="card-header" class="d-flex mx-3 justify-content-between">
        <h4>Students</h4>
        <RouterLink class="btn btn-info mt-2" to="/students/create">Add Student</RouterLink>
      </div>

      <div className="card-body">
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="student in studentsList" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.course }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.phone }}</td>
              <td>{{ student.created_at }}</td>
              <td class=" text-center">
                <RouterLink :to="{path:'students/'+student.id+'/edit'}" class="btn btn-sm btn-warning">Edit</RouterLink>
                <button @click="deleteStudent(student.id)" class="btn btn-sm btn-danger mx-2">Delete</button>
                <button @click="count--" class="btn btn-sm btn-info mx-2">{{ count }}</button>
                <button :disabled="isButtonDisabled" class="btn btn-sm btn-primary mx-2">Button</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="loading" className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-if="error" className="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      students: [],
      loading: true,
      error: null,
      count: 100
    };
  },
  computed:{
    studentsList(){
      return this.students;
    }
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    async getStudents() {
      this.loading = true;
      this.students = [];
      try {
        const response = await axios.get('https://laravel.cod6e.com/api/students');
        const responseData = response.data;
        this.students = responseData.student; // Assign new data directly
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
      this.loading = false;
    },
    deleteStudent(studentId) {
      if (confirm("Are you sure you want to delete this data?")) {
        axios.delete(`https://laravel.cod6e.com/api/students/${studentId}/delete`)
            .then(res => {
              alert(res.data.message);
              this.getStudents(); // Fetch the updated list after deletion
            })
            .catch(function (error) {
              if (error.response) {
                if (error.response.status === 422) {
                  this.errorList = error.response.data.errors;
                }
                if (error.response.status === 500) {
                  alert(error.response.data.message);
                }
              }
            });
      }
    }
    //  async getStudents() {
    //
    //    // const response = await  fetch('http://127.0.0.1:8777/api/students');
    //    //
    //    // const responseData = await response.json();
    //    //
    //    // console.log(responseData);
    //    // console.log(responseData.student[0].id);
    //    //
    //    // responseData.student.forEach(el=>{
    //    //   this.students.push(el);
    //    // })
    //    //
    //    // console.log(this.students);
    //
    // await  axios.get('http://127.0.0.1:8777/api/students')
    //       .then(response => {
    //
    //         let responseData = response.json();
    //         console.log(responseData.student);
    //
    //         responseData.student.forEach(el=>{
    //           this.students.push(el);
    //         })
    //
    //         console.log(this.students);
    //
    //       })
    // }
  }
};
</script>
