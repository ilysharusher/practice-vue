import {onMounted, ref} from "vue";
import axios from "axios";

const BaseURL = "http://34.82.81.113:3000"

const students = ref([])

export function useStudent() {
    function getStudents() {
        axios.get(`${BaseURL}/students`).then(res => students.value = res.data)
    }

    onMounted(getStudents)

    function addStudent(student) {
        axios.post(`${BaseURL}/students`, student)
            .then(data => {
                console.log(data);
                students.value.push(data.data)
            })
    }

    function updateStudent(student) {
        axios.put(`${BaseURL}/students/${student._id}`, student)
            .then(data => {
                students.value = students.value.map(value => {
                    if (value._id === student._id) {
                        return data.data
                    }

                    return value
                })
            })
    }

    function deleteStudent(id) {
        axios.delete(`${BaseURL}/students/${id}`)
            .then(data => {
                students.value = students.value.filter(value => value._id !== id)
            })

    }

    return {students, addStudent, updateStudent, deleteStudent}
}