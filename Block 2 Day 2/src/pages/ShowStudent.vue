<script setup>
import {onMounted, ref} from "vue";
import {useStudent} from "@/composables/api";

const {studentId} = defineProps(
    {
      studentId: String
    }
);

const {getStudentById} = useStudent();

const student = ref(null);

onMounted(() => {
  getStudentById(studentId).then((value) => student.value = value);
});
</script>

<template>
  <div>
    <router-link :to="{name: 'students.index'}">На головну</router-link>
    <table>
      <tr v-if="student">
        <td><img :src="student.photo" alt="photo"></td>
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td><input :checked="student.isDonePr" disabled type="checkbox"></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>

</style>