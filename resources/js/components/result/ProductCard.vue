<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    default: "Huawei Tab 16 GB WiFi Plus Cellular",
  },
  price: {
    type: String,
    default: "0",
  },
  image: {
    type: String,
    default: "product1.jfif",
  },
  width: {
    type: String,
    default: "209px",
  },
  height: {
    type: String,
    default: "271px",
  },
});

const dropdownRef = ref();
const isShowMenu = ref(false);
</script>
<template>
  <div
    class="card-container bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img
        class="rounded-t-lg h-[207px]"
        :src="`/assets/images/${image}`"
        alt=""
      />
      <div class="whitespace-nowrap space-y-1 p-2">
        <p
          class="text-ellipsis overflow-hidden text-base leading-[22px] font-bold tracking-tight text-black dark:text-white"
        >
          {{ name }}
        </p>
        <p
          class="text-base leading-[22px] font-bold text-black dark:text-gray-400"
        >
          £{{ price }}
        </p>
      </div>
    </a>
  </div>
</template>
<style lang="scss" scoped>
.card-container {
  width: v-bind(width);
  height: v-bind(height);
}
</style>