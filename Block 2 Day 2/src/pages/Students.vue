<script setup>
import {reactive, ref} from "vue";
import {useStudent} from "@/composables/api.js";

const search = ref('')

const {students, addStudent: addStudent, updateStudent, deleteStudent} = useStudent()

const newStudent = reactive({
  name: '',
  group: '',
  isDonePr: false
})

function add() {
  addStudent({photo: "https://robohash.org/33", ...newStudent})

  newStudent.photo = ''
  newStudent.name = ''
  newStudent.group = ''
  newStudent.isDonePr = false
}

const editingStudentId = ref('')

function edit(student) {
  editingStudentId.value = student._id

  newStudent.name = student.name
  newStudent.photo = student.photo
  newStudent.group = student.group
  newStudent.isDonePr = student.isDonePr
}

function update() {
  updateStudent({
    _id: editingStudentId.value,
    ...newStudent
  })

  editingStudentId.value = ''

  newStudent.name = ''
  newStudent.photo = ''
  newStudent.group = ''
  newStudent.isDonePr = false
}
</script>

<template>
  <div>
    <input v-model="search">
    <table>
      <tr v-for="student in students" :class="{
        'text-red-600': student.name.includes(search) && search !== ''
      }"
      >
        <td><img :src="student.photo" alt="photo" class="mt-5"></td>
        <td>
          <router-link :to="{name: 'students.show', params: {studentId: student._id}}"> {{ student.name }}</router-link>
        </td>
        <td>{{ student.group }}</td>
        <td><input :checked="student.isDonePr" disabled type="checkbox"></td>
        <button class="cursor-pointer" @click="deleteStudent(student._id)">Delete</button>
        <button class="cursor-pointer" role="button" @click="edit(student)">Edit</button>
      </tr>
    </table>

    <div>
      <div>
        <label>
          photo
          <input v-model.trim="newStudent.photo" type="text">
        </label>
      </div>
      <br>
      <div>
        <label>
          Username
          <input v-model.trim="newStudent.name" type="text">
        </label>
      </div>
      <br>
      <div>
        <label>
          Group
          <select v-model="newStudent.group">
            <option value="RPZ-20-1/9">RPZ 20-1/9</option>
            <option value="RPZ-20-2/9">RPZ 20-2/9</option>
          </select>
        </label>
      </div>
      <br>
      <div>
        <label>
          complete task?
          <input v-model="newStudent.isDonePr" type="checkbox">
        </label>
      </div>
      <br>
      <button v-if="editingStudentId !== ''" @click="update">Update</button>
      <button v-else @click="add">Add student</button>
    </div>
  </div>
</template>

<style scoped>

</style>