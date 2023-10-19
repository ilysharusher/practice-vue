<script setup>
import {onMounted, reactive, computed, watch, ref} from 'vue';
import axios from "axios";

const search = ref("");
const students = ref([]);

onMounted(() => {
  axios.get('http://34.82.81.113:3000/students').then(res => students.value = res.data)
});

const filteredStudents = computed(() => {
  return students.value.filter(student => student.name.toLowerCase().includes(search.value.toLowerCase()));
});

const filterStudents = () => {
  students.value.forEach(student => {
    student.highlight = student.name.toLowerCase().includes(search.value.toLowerCase());
  });
};

const deleteStudent = (__id) => {
  const index = students.value.findIndex(student => student.__id === __id);

  students.value.splice(index, 1);
};

watch(search, filterStudents);

const student = reactive({
  name: '',
  group: '',
  isDonePr: false
});

function addStudent() {
  students.value.push({__id: students.value.slice().pop().__id++, highlight: false, ...student})

  student.name = ''
  student.group = ''
  student.isDonePr = false
}
</script>

<template>
  <input v-model="search" placeholder="Search by last name" @input="filterStudents"/>
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Group</th>
      <th>Passed</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="student in filteredStudents" :key="student.id">
      <td :style="{ backgroundColor: student.highlight ? 'yellow' : '' }">{{ student.name }}</td>
      <td>{{ student.group }}</td>
      <td>
        <input type="checkbox" v-model="student.isDonePr" disabled/>
      </td>
      <td>
        <button @click="deleteStudent(student.__id)">Delete</button>
      </td>
    </tr>
    </tbody>
  </table>
  <br>
  <div>
    <div>
      <label>
        Name:
        <input v-model.trim="student.name" type="text">
      </label>
    </div>
    <br>
    <div>
      <label>
        Group:
        <select v-model="student.group">
          <option value="RPZ-20-1/9">RPZ 20 1/9</option>
          <option value="RPZ-20-2/9">RPZ 20 2/9</option>
        </select>
      </label>
    </div>
    <br>
    <div>
      <label>
        Is he/she complete task?
        <input type="checkbox" v-model="student.isDonePr">
      </label>
    </div>
    <br>
    <button class="btn" role="button" @click="addStudent">Add student</button>
  </div>
</template>

<style scoped>

</style>
