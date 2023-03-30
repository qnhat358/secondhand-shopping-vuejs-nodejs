<script setup>
import { ref, computed } from "vue";
import useDetectOutsideClick from "../../composables/useDetectOutsideClick";
const props = defineProps({
  modelValue: String,
  label: String,
  options: {
    type: Array,
    default: [],
  },
  menuWidth: {
    type: String,
    default: "288px",
  },
  menuHeight: {
    type: String,
    default: "fit-content",
  },
  location: {
    type: String,
    default: "bottom",
  },
});

const emit = defineEmits(["update:modelValue", "toggled"]);

const dropdownRef = ref();
const isShowMenu = ref(false);

const locationClass = computed(() => {
  switch (props.location) {
    case "top":
      return "bottom-full left-1/2 -translate-x-1/2";
    case "bottom":
      return "left-1/2 -translate-x-1/2";
    case "left":
      return "right-full top-1/2 -translate-y-1/2";
    case "right":
      return "left-full top-1/2 -translate-y-1/2";
    case "top-left":
      return "bottom-full right-0";
    case "top-right":
      return "bottom-full left-0";
    case "bottom-left":
      return "top-full right-0";
    case "bottom-right":
      return "top-full left-0";
    default:
      break;
  }
});

const clickHandle = (option) => {
  if (option != props.modelValue) {
    emit("update:modelValue", option);
  }
  isShowMenu.value = false;
};

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
  emit("toggled");
};

useDetectOutsideClick(dropdownRef, () => {
  isShowMenu.value = false;
});
</script>
<template>
  <div class="relative w-fit space-y-1" ref="dropdownRef">
    <!-- Dropdown button -->
    <div
      v-if="modelValue"
      class="flex items-center h-9 shadow-md rounded-full text-green-400"
    >
      <button
        class="flex items-center rounded-l-full h-full p-2 pl-4 bg-white hover:bg-[#E2E8EB] text-base leading-[22px]"
        @click="toggleMenu"
      >
        {{ label }}
      </button>
      <button
        class="flex items-center rounded-r-full h-full p-2 pr-4 bg-white hover:bg-[#E2E8EB]"
        @click="$emit('update:modelValue', ''), (isShowMenu = false)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div v-else>
      <button
        class="shadow-md inline-flex h-9 items-center p-4 text-base leading-[22px] bg-white rounded-full hover:bg-[#E2E8EB]"
        @click="toggleMenu"
      >
        {{ label }}
        <svg
          class="w-5 h-5 ml-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
    <!-- Dropdown menu -->
    <div
      id="dropdownMenu"
      v-show="isShowMenu"
      class="absolute bg-white rounded-lg z-10 shadow text-left dark:bg-gray-700 dark:divide-gray-600 overflow-x-hidden overflow-y-hidden"
      :class="locationClass"
    >
      <slot name="menu" :toggleMenu="toggleMenu">
        <ul
          class="text-[16px] leading-[22px] py-2"
          aria-labelledby="dropdownButton"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            :value="index"
            @click="clickHandle(option)"
            class="block"
          >
            <p
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              {{ option }}
            </p>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dropdownMenu {
  width: v-bind(menuWidth);
  height: v-bind(menuHeight);
}
</style>