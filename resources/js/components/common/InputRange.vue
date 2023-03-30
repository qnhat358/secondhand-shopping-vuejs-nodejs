<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  modelValue: Number,
  label: String,
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 100,
  },
  location: {
    type: String,
    default: "bottom",
  },
});

const emit = defineEmits(["update:modelValue"]);

const sliderValue = computed({
  get() {
    if (props.modelValue != null) {
      return props.modelValue;
    } else {
      return 0;
    }
  },
  set(newValue) {
    emit("update:modelValue", +newValue);
  },
});

const clickHandle = (option) => {
  if (option != props.modelValue) {
    emit("update:modelValue", option);
  }
  isShowMenu.value = false;
};
</script>
<template>
  <div>
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="sliderValue"
      class="slider w-full h-1 mb-6 bg-gray-200 rounded-lg cursor-pointer range-sm dark:bg-gray-700"
      :style="`background: linear-gradient(90deg, rgb(60, 206, 105) ${
        (modelValue / max) * 100
      }%, rgb(207, 215, 219) ${(modelValue / max) * 100}%)`"
    />
  </div>
</template>
<style lang="scss" scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  box-shadow: 1px 1px 1px 1px rgb(72 98 112 / 10%);
  padding: 14px;
  width: 10px;
  height: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 50%;
  background-color: white;
  background-image: url("../../assets/images/slider.png");
  background-size: 40%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
}

// .slider::-moz-range-thumb {
//   width: 40px;
//   height: 40px;
//   border: 10px;
//   border-radius: 50%;
//   background-image: url("../../assets/images/slider.png");
//   background-size: contain;
//   background-position: center center;
//   background-repeat: no-repeat;
//   cursor: pointer;
// }
</style>