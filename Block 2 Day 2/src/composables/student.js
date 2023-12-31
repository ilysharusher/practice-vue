import axios from "axios";
import {computed, onMounted, ref} from "vue";

const URL = "http://34.82.81.113:3000"

const students = ref([])
const studentsCount = computed(() => students.value.length)

export function useStudent() {
    function getStudents() {
        axios.get(`${URL}/students`).then(res => students.value = res.data)
    }

    onMounted(getStudents)

    function addStudent(student) {
        axios.post(`${URL}/students`, student)
            .then(data => {
                console.log(data);
                students.value.push(data.data)
            })
    }

    function updateStudent(student) {
        axios.put(`${URL}/students/${student._id}`, student)
            .then(data => {
                students.value = students.value.map(s => {
                    if (s._id === student._id) {
                        return data.data
                    }

                    return s
                })
            })
    }

    function deleteStudent(studentId) {
        axios.delete(`${URL}/students/${studentId}`)
            .then(data => {
                students.value = students.value.filter(s => s._id !== studentId)
            })

    }

    function getStudentById(studentId) {
        return axios.get(`${URL}/students/${studentId}`).then(res => res.data)

    }


    return {students, addStudent, updateStudent, deleteStudent, getStudentById, studentsCount}
}