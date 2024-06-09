<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Student</h4>
      </div>
      <div class="card-body">
        <ul v-if="Object.keys(this.errorList).length > 0" class="alert alert-warning">
          <li v-for="(error,index) in this.errorList" :key="index" class="mb-0 ms-3">
            {{error[0]}}
          </li>
        </ul>

        <div class="mb-3">
          <label for="">Name</label>
          <input type="text" v-model="model.student.name" class="form-control">
        </div>

        <div class="mb-3">
          <label for="">Course</label>
          <input type="text" v-model="model.student.course" class="form-control">
        </div>

        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" v-model="model.student.email" class="form-control">
        </div>

        <div class="mb-3">
          <label for="">Phone</label>
          <input type="text" v-model="model.student.phone" class="form-control">
        </div>

        <div class="mb-3">
          <button type="button" @click="UpdateStudent" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "studentsEdit",
  data(){
    return{
      studentId:'',
      model: {
        student:{
          name: '',
          course: '',
          email: '',
          phone: '',
        }
      },
      errorList: []
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.studentId = this.$route.params.id;
    this.getStudentData(this.$route.params.id)
  },
  methods: {
    getStudentData(studentId){
      axios.get(`http://127.0.0.1:8777/api/students/${studentId}/edit`).then(res =>{
         // this.model.student.name = res.data.student.name
         // this.model.student.course = res.data.student.course
         // this.model.student.email = res.data.student.email
         // this.model.student.phone = res.data.student.phone
        this.model.student = res.data.student
      }).catch(function (error){
        if (error.response) {
          if (error.response.status  === 404){
            alert(error.response.data.message);
          }
        }
      });
    },
    UpdateStudent(){
      var MyThis = this;
      axios.put(`http://127.0.0.1:8777/api/students/${this.studentId}/edit`,this.model.student).then(res =>{
        console.log(res);
        alert(res.data.message);
        this.model.student = {
            name: '',
            course: '',
            email: '',
            phone: '',
        }
        this.$router.push({ name: 'students' });
      })
      .catch(function (error){
        if (error.response) {
          if (error.response.status  === 422){
            MyThis.errorList = error.response.data.errors
          }
          if (error.response.status  === 500){
            alert(error.response.data.message)
          }
        }
      });
    }
  }
}
</script>

<style scoped>

</style>