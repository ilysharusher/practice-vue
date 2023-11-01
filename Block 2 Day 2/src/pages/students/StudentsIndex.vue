<script setup>
import {reactive, ref} from "vue";
import {useStudent} from "/src/composables/student.js";
import {useTheme} from "../../composables/theme.js";
import {useAuth} from "../../composables/auth.js";

const search = ref('')

const {students, addStudent: addStudent, updateStudent, deleteStudent, studentsCount} = useStudent()
const theme = useTheme()

const newStudent = reactive({
  name: '',
  group: '',
  isDonePr: false
})

function add() {
  addStudent({photo: "https://robohash.org/33", ...newStudent})

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

const {user} = useAuth()
</script>

<template>
  <div :style="theme.themeStyles">
    <button @click="theme.toggleTheme">Switch theme</button>
    <input v-model="search" type="search">
    <div>
      Count of students: {{ studentsCount }}
    </div>
    <table>
      <tr v-for="student in students" :class="{red: student.name.includes(search) && search !== ''}">
        <td><img :src="student.photo" alt="photo" style="height: 100px"></td>
        <td>
          <router-link :to="{name: 'students.show', params: {studentId: student._id}}"> {{ student.name }}</router-link>
        </td>
        <td>{{ student.group }}</td>
        <td><input :checked="student.isDonePr" disabled type="checkbox"></td>
        <td class="link" role="button" @click="edit(student)">Edit</td>
        <td class="link" role="button" @click="deleteStudent(student._id)" v-show="student.group === user?.group">
          Delete
        </td>
      </tr>
    </table>

    <div>
      <div>
        <label>
          Photo:
          <input v-model.trim="newStudent.photo" type="text">
        </label>
      </div>
      <br>
      <div>
        <label>
          Name:
          <input v-model.trim="newStudent.name" type="text">
        </label>
      </div>
      <br>
      <div>
        <label>
          Group:
          <select v-model="newStudent.group">
            <option value="RPZ-20-1/9">RPZ 20 1/9</option>
            <option value="RPZ-20-2/9">RPZ 20 2/9</option>
          </select>
        </label>
      </div>
      <br>

      <div>
        <label>
          Is task completed:
          <input v-model="newStudent.isDonePr" type="checkbox">
        </label>
      </div>
      <button v-if="editingStudentId !== ''" class="btn" role="button" @click="update">Update</button>
      <button v-else class="btn" role="button" @click="add">ADD</button>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 4px 20px;
}

.link {
  text-decoration: underline;
  color: mediumvioletred;
  cursor: pointer;
}

.red {
  color: darkred;
}

table {
  margin: 10px 0;
}

table, th, td {
  border: 1px solid darkslategrey;
  border-collapse: collapse;
}

td {
  padding: 4px 10px;
}
</style>