<script setup>
import {getAddresses, getCities} from "./api.js"
import {computed, ref, watch} from "vue";
import DefaultInput from "./components/DefaultInput.vue";

const inputCity = ref('');
const suggestCity = ref([]);

watch(inputCity, async (v) => {
  if (v !== '') {
    suggestCity.value = await getCities(v);
  }
});

const enableInput = computed(() => {
  return suggestCity.value.some(city => city['Description'] === inputCity.value);
});

const inputHouse = ref('');
const suggestHouse = ref([]);

watch(inputHouse, async (v) => {
  if (v !== '') {
    suggestHouse.value = await getAddresses(v, inputCity.value);
  }
});
</script>

<template>
  <div class="container mx-auto mt-10 px-5 text-xl font-bold flex flex-col gap-5">
    <label>
      City:
      <DefaultInput
          v-model="inputCity"
          :columns="['Description', 'AreaDescription']"
          :suggestions="suggestCity"
          class="mt-3"
      />
    </label>
    <label>
      Post office number:
      <DefaultInput
          v-model="inputHouse"
          :columns="['Description']"
          :disabled="!enableInput"
          :suggestions="suggestHouse"
          class="mt-3"
      />
    </label>
  </div>
</template>

<style scoped>

</style>

