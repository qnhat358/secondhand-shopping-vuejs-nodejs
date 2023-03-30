<script setup>
import { Modal } from "flowbite-vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { login } = useAuthStore();
const { loginForm } = storeToRefs(useAuthStore());
const router = useRouter();

const props = defineProps({});

const emit = defineEmits(["hideModal"]);

const loginRequest = ref({
  email: "",
  password: "",
});
const closeModal = () => {
  emit("hideModal");
};
const handleLogin = async () => {
  await login(loginRequest.value);
  router.push({ name: "home" });
  emit("hideModal");
};
</script>
<template>
  <Modal class="z-[1001]" @close="closeModal">
    <template #header>
      <div class="flex items-center text-3xl">Login Form</div>
    </template>
    <template #body>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="email"
          v-model="loginForm.email"
          @keyup.enter="handleLogin"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Email address</label
        >
      </div>
      <div class="relative z-0 w-full mb-6 group">
        <input
          type="password"
          v-model="loginForm.password"
          @keyup.enter="handleLogin"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_password"
          class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <div class="flex justify-end gap-5">
        <button
          @click="handleLogin"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
          Cancel
        </button>
      </div>
    </template>
  </Modal>
</template>
<style lang="scss" scoped>
</style>