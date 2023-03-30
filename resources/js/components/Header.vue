<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Dropdown from "./common/Dropdown.vue";
import LoginModal from "./LoginModal.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

const {isAuthenticated} = storeToRefs(useAuthStore());
const {logout} = useAuthStore();

const router = useRouter();
const route = useRoute();

const dropdownItems = ["Help Centre", "Shpock + for professionals"];
const atTopOfPage = ref(true);
const searchValue = ref(route.query.q ?? "");
const isShowModal = ref(false);
// the function to call when the user scrolls, added as a method
const handleScroll = () => {
  // when the user scrolls, check the pageYOffset
  if (window.pageYOffset > 0) {
    // user is scrolled
    if (atTopOfPage.value) atTopOfPage.value = false;
  } else {
    // user is at top of page
    if (!atTopOfPage.value) atTopOfPage.value = true;
  }
};

const searchHandle = () => {
  router.push({ name: "result", query: { q: searchValue.value } });
};

const handleLogout = async () => {
  await logout();
  location.reload();
  // location.reload();
}

// watch(
//   () => route.query,
//   () => {
//     location.reload();
//   }
// );

onBeforeMount(async () => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
<LoginModal v-show="isShowModal" @hideModal="isShowModal = false"></LoginModal>
  <nav
    :class="{ scrolled: !atTopOfPage }"
    class="fixed flex w-full h-[72px] bg-white items-center justify-between flex-wrap m-auto top-0 left-0 animated transition duration-500"
  >
    <div
      class="flex flex-wrap items-center justify-between mx-auto w-[1240px] h-full px-8"
    >
      <div class="flex">
        <router-link :to="{ name: 'home' }" class="hover:bg-transparent">
          <img src="@assets/images/shpock.svg" width="146.22" />
        </router-link>
        <div class="flex items-center ml-4">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-[500px]">
            <div
              class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 z-50"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              class="border-[1px] border-gray-300 rounded-full focus:ring-black focus:border-gray-200 duration-150 animation block w-full h-[40px] pl-10 p-2.5"
              placeholder="What are you looking for..."
              required
              v-model="searchValue"
              @keyup.enter="searchHandle"
            />
          </div>
        </div>
      </div>
      <div
        class="items-center justify-between w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="text-black text-[16px] font-bold hover:bg-transparent hover:text-gray-500"
              aria-current="page"
              >+ Add new listing</a
            >
          </li>
          <li v-if="!isAuthenticated">
            <a
              href="#"
              class="text-black text-[16px] font-bold hover:bg-transparent hover:text-gray-500"
              >Sign up</a
            >
          </li>
          <li v-if="!isAuthenticated">
            <a
              class="text-black text-[16px] font-bold cursor-pointer hover:bg-transparent hover:text-gray-500"
              @click="isShowModal = true"
              >Log in</a
            >
          </li>
          <li v-else>
            <a
              class="text-black text-[16px] font-bold cursor-pointer hover:bg-transparent hover:text-gray-500"
              @click="handleLogout"
              >Log out</a
            >
          </li>
          <li>
            <Dropdown
              :options="dropdownItems"
              location="bottom-left"
              menuWidth="250px"
            >
              <template v-slot:buttonLabel>
                <div
                  class="text-black text-[16px] font-bold hover:bg-transparent hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="black"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </div>
              </template>
            </Dropdown>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  z-index: 1000;
}

nav.scrolled {
  @apply shadow-2xl;
  border-bottom: 0px;
}
</style>


