<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import SlideImageGroup from "./common/SlideImageGroup.vue";
import InputRange from "./common/InputRange.vue";
import FeedbackCard from "./home/FeedbackCard.vue";
import ProductCard from "./result/ProductCard.vue";
import FilterDropdown from "./result/FilterDropdown.vue";

import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/product.js";

const { fetchProductList } = useProductStore();
const { products, filterValue } = storeToRefs(useProductStore());

const route = useRoute();

const locationArray = [
  1,
  2,
  3,
  4,
  5,
  10,
  15,
  20,
  30,
  60,
  100,
  200,
  300,
  500,
  1000,
  "Everywhere",
];
const dateListedArray = [
  "Any time",
  "Past 24 hours",
  "Past Week",
  "Past Month",
];
const sortArray = [
  "Closest listing first",
  "Relevance",
  "Newest listing first",
  "Price high to low",
  "Price low to high",
];
const location = ref({
  cityCode: "",
  radius: 0,
});
const price = ref({
  from: 0,
  to: 0,
});
const searchValue = ref(route.query.q);
const isShowSlideMenu = ref(false);
const isSlideLeft = ref([false]);
const isSlideRight = ref([false]);
const mainCategories = ref([
  {
    name: "Electronics",
    icon: "tv",
    subMenu: [
      { name: "All electronics" },
      {
        name: "Phones",
        subMenu: [
          {
            name: "mobile phone",
          },
          {
            name: "smart phone",
          },
        ],
      },
      {
        name: "Televisions",
        subMenu: [
          {
            name: "4k tv",
          },
          {
            name: "full hd tv",
          },
        ],
      },
    ],
  },
  { name: "Fashion & Accessories", icon: "shirt" },
  { name: "Home & Garden", icon: "house" },
  { name: "Baby & Toddler", icon: "baby-carriage" },
  { name: "Electronics", icon: "tv" },
  { name: "Fashion & Accessories", icon: "shirt" },
  { name: "Home & Garden", icon: "house" },
  { name: "Baby & Toddler", icon: "baby-carriage" },
  { name: "Electronics", icon: "tv" },
  { name: "Fashion & Accessories", icon: "shirt" },
  { name: "Home & Garden", icon: "house" },
  { name: "Baby & Toddler", icon: "baby-carriage" },
  { name: "Electronics", icon: "tv" },
  { name: "Fashion & Accessories", icon: "shirt" },
  { name: "Home & Garden", icon: "house" },
  { name: "Baby & Toddler", icon: "baby-carriage" },
]);

const subCategories = ref([{ subMenu: mainCategories }]);
const isHasResult = ref(true);

const updateFilterValue = () => {
  if (filterValue.value.location) {
    let locationArray = filterValue.value.location.split("-");
    location.value.cityCode = locationArray[0];
    location.value.radius = +locationArray[1];
  } else {
    location.value.cityCode = "";
    location.value.radius = 0;
  }
  if (filterValue.value.price) {
    let priceArray = filterValue.value.price.split("-");
    price.value.from = +priceArray[0];
    price.value.to = +priceArray[1];
    console.log(price.value);
  } else {
    price.value.from = 0;
    price.value.to = 0;
  }
};

const handleClickCategory = (category, toggleMenu) => {
  if (category.subMenu) {
    subCategories.value[subCategories.value.length - 1].position = "left";
    subCategories.value.push({ ...category, position: "center" });
  } else {
    filterValue.value.category = category.name;
    toggleMenu();
    subCategories.value = [{ subMenu: mainCategories }];
  }
};
const handleClickCategoryBack = () => {
  subCategories.value.pop();
  subCategories.value[subCategories.value.length - 1].position = "center";
};
const handleClickDateListed = (dateListed, toggleMenu) => {
  filterValue.value.dateListed = dateListed;
  toggleMenu();
};
const handleClickSort = (sort, toggleMenu) => {
  filterValue.value.sort = sort;
  toggleMenu();
};
const handleClickLocation = (toggleMenu) => {
  filterValue.value.location = `${location.value.cityCode}-${location.value.radius}`;
  toggleMenu();
};
const handleClearLocation = (toggleMenu) => {
  filterValue.value.location = "";
  toggleMenu();
};
const handleClickPrice = (toggleMenu) => {
  filterValue.value.price = `${price.value.from}-${price.value.to}`;
  toggleMenu();
};
const handleClearPrice = (toggleMenu) => {
  filterValue.value.price = "";
  toggleMenu();
};

onMounted(async () => {
  await fetchProductList();
});
</script>

<template>
  <div
    class="flex flex-col items-center mx-auto w-[1240px] min-h-[calc(100vh-72px)] px-8 pt-10 mb-10"
  >
    <div class="self-start mb-10">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center">
          <li class="inline-flex items-center">
            <router-link
              :to="{ name: 'home' }"
              class="inline-flex items-center text-base leading-[22px] font-bold text-black hover:bg-transparent hover:text-gray-500 underline"
            >
              Home
            </router-link>
          </li>
          <li v-if="filterValue.category">
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                class="text-base leading-[22px] font-bold text-black hover:bg-transparent hover:text-gray-500 underline"
                >{{ filterValue.category }}</a
              >
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-base leading-[22px] text-black">{{
                searchValue
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
      <div class="search-title mb-4">
        <span class="font-bold text-black text-3xl leading-[42px]">
          Ads for “{{ searchValue }}” for Sale
        </span>
        <span
          v-if="filterValue.category"
          class="font-bold text-black text-3xl leading-[42px]"
        >
          in “{{ filterValue.category }}”
        </span>
      </div>
      <div class="flex space-x-2">
        <FilterDropdown
          v-model="filterValue.category"
          label="Category"
          :options="mainCategories"
          location="bottom-right"
          menuWidth="320px"
          menuHeight="360px"
        >
          <template #menu="{ toggleMenu }">
            <transition-group name="slide">
              <div
                class="min-w-[320px] absolute transition-all duration-500 h-[360px] divide-gray-200 divide-y"
                v-for="(subCategory, index) in subCategories"
                :key="index"
                :class="{
                  '-translate-x-full': subCategory.position == 'left',
                }"
              >
                <div
                  v-if="subCategory.name"
                  @click="handleClickCategoryBack"
                  class="flex items-center cursor-pointer h-[50px] font-bold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  {{ subCategory.name }}
                </div>
                <div class="h-full overflow-y-auto">
                  <ul class="text-[16px] leading-[22px]">
                    <li
                      v-for="(category, index) in subCategory.subMenu"
                      :key="index"
                      :value="category.name"
                      @click="handleClickCategory(category, toggleMenu)"
                      class="block"
                    >
                      <div
                        class="flex items-center justify-between px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer h-12"
                      >
                        <div class="flex items-center pl-6">
                          <font-awesome-icon
                            v-if="category.icon"
                            :icon="`fa-solid fa-${category.icon}`"
                            color="black"
                            class="mr-2"
                          />
                          {{ category.name }}
                        </div>
                        <svg
                          v-if="category.subMenu"
                          aria-hidden="true"
                          class="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </transition-group>
          </template>
        </FilterDropdown>
        <FilterDropdown
          v-model="filterValue.location"
          label="Location"
          location="bottom-right"
          menuWidth="320px"
          menuHeight="225px"
          @toggled="updateFilterValue()"
        >
          <template #menu="{ toggleMenu }">
            <div
              class="flex w-[318px] flex-col divide-gray-200 divide-y h-full"
            >
              <div>
                <div class="flex items-center px-4 py-4">
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div
                      class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none"
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
                      v-model="location.cityCode"
                      id="location-search"
                      class="border-[1px] border-gray-300 rounded-md focus:ring-black focus:border-gray-200 duration-150 animation block w-full h-[40px] p-2.5"
                      placeholder="Enter a Zip-Code or City"
                      required
                    />
                  </div>
                </div>
                <div class="px-4 py-2">
                  <div class="flex justify-between">
                    <span
                      class="mb-2 text-sm font-medium text-[#3cce69] dark:text-white"
                      >Radius</span
                    >
                    <span
                      v-if="location.radius != 15"
                      class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >{{ locationArray[location.radius] }} mi</span
                    >
                    <span
                      v-else
                      class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >{{ locationArray[location.radius] }}</span
                    >
                  </div>
                  <InputRange v-model="location.radius" :min="0" :max="15" />
                </div>
              </div>
              <div class="flex h-full justify-end items-center space-x-8 pr-4">
                <button @click="handleClearLocation(toggleMenu)">
                  <span class="leading-[22px] font-bold">Clear</span>
                </button>
                <button
                  class="bg-green-400 rounded-full px-4 py-2 text-white"
                  @click="handleClickLocation(toggleMenu)"
                >
                  <span class="leading-[22px] font-bold">Apply</span>
                </button>
              </div>
            </div>
          </template>
        </FilterDropdown>
        <FilterDropdown
          v-model="filterValue.price"
          label="Price"
          location="bottom-right"
          menuWidth="320px"
          menuHeight="175px"
          @toggled="updateFilterValue()"
        >
          <template #menu="{ toggleMenu }">
            <div
              class="flex w-[318px] flex-col divide-gray-200 divide-y h-full"
            >
              <div class="flex flex-row px-4 py-4 space-x-4">
                <div class="flex flex-col flex-1">
                  <span class="text-black">From</span>
                  <input
                    v-model="price.from"
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="0"
                    class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-0 mt-2"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <span class="text-black">To</span>
                  <input
                    v-model="price.to"
                    type="number"
                    min="0"
                    max="9999"
                    placeholder="No limit"
                    class="w-full rounded-lg border-gray-300 focus:border-black focus:ring-0 mt-2"
                  />
                </div>
              </div>
              <div class="flex h-full justify-end items-center space-x-8 pr-4">
                <button @click="handleClearPrice(toggleMenu)">
                  <span class="leading-[22px] font-bold">Clear</span>
                </button>
                <button
                  class="bg-green-400 rounded-full px-4 py-2 text-white"
                  @click="handleClickPrice(toggleMenu)"
                >
                  <span class="leading-[22px] font-bold">Apply</span>
                </button>
              </div>
            </div>
          </template>
        </FilterDropdown>
        <FilterDropdown
          v-model="filterValue.dateListed"
          label="Date Listed"
          location="bottom-right"
          menuWidth="320px"
          menuHeight="175px"
        >
          <template #menu="{ toggleMenu }">
            <ul
              class="text-[16px] leading-[22px] flex flex-col h-full"
              aria-labelledby="dropdownButton"
            >
              <li
                v-for="(option, index) in dateListedArray"
                :key="index"
                :value="index"
                @click="handleClickDateListed(option, toggleMenu)"
                class="block flex-1"
              >
                <div
                  v-if="option == filterValue.dateListed"
                  class="flex h-full items-center px-4 active:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <span class="font-bold dark:hover:text-white">
                    {{ option }}
                  </span>
                  <span class="text-gray-400 ml-1">(0) </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 ml-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div
                  v-else
                  class="flex h-full items-center px-4 active:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <span class="dark:hover:text-white">
                    {{ option }}
                  </span>
                  <span class="text-gray-400 ml-1">(0)</span>
                </div>
              </li>
            </ul>
          </template>
        </FilterDropdown>
        <FilterDropdown
          v-model="filterValue.sort"
          label="Sort"
          location="bottom-right"
          menuWidth="320px"
          menuHeight="235px"
        >
          <template #menu="{ toggleMenu }">
            <ul
              class="text-[16px] leading-[22px] flex flex-col h-full"
              aria-labelledby="dropdownButton"
            >
              <li
                v-for="(option, index) in sortArray"
                :key="index"
                :value="index"
                @click="handleClickSort(option, toggleMenu)"
                class="block flex-1"
              >
                <div
                  v-if="option == filterValue.sort"
                  class="flex h-full items-center px-4 active:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <span class="font-bold dark:hover:text-white">
                    {{ option }}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="w-6 h-6 ml-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <div
                  v-else
                  class="px-4 h-full items-center flex active:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <span class="dark:hover:text-white">
                    {{ option }}
                  </span>
                </div>
              </li>
            </ul>
          </template>
        </FilterDropdown>
      </div>
    </div>
    <div
      v-if="isHasResult"
      class="self-start grid grid-cols-1 md:grid-cols-4 gap-2"
    >
      <ProductCard
        v-for="product in products"
        :key="product.ProductID"
        :image="product.ProductImage"
        :name="product.ProductName"
        :price="product.Price"
      ></ProductCard>
    </div>
    <div v-else class="flex flex-col items-center mr-[300px]">
      <img src="@assets/images/no-result.png" class="h-[320px] w-[320px]" />
      <div class="w-[422px] text-center">
        <p class="text-[22px] leading-[32px] font-bold mb-4">No results</p>
        <p class="text-[22px] leading-[32px] break-words mb-3">
          We weren't able to find what you're looking for at the moment. Try
          shopping by category or changing your search terms.
        </p>
      </div>
      <button class="text-white font-bold bg-black rounded-full px-6 py-2">
        Discover items near you
      </button>
    </div>
  </div>
  <div class="h-[286px] bg-gradient-135 from-[#76dc96] to-[#009e49]">
    <div class="w-[1240px] h-full mx-auto px-8 flex flex-row">
      <div class="flex items-end justify-center flex-[5]">
        <img
          src="@assets/images/result-banner.png"
          class="h-[230px] w-[230px]"
        />
      </div>
      <div class="flex flex-col flex-[7] px-8 py-8 justify-around">
        <h3 class="text-white font-bold text-3xl leading-[42px]">
          Get the App
        </h3>
        <p class="text-white text-[22px] leading-8 break-words">
          Download for free now and start buying or selling (almost) anything.
          Zero fees. Zero hassle. Zero reason not to!
        </p>
        <div class="flex flex-row mt-[20px] gap-[12px]">
          <img src="@assets/images/googleplay.svg" class="h-[40px]" />
          <img src="@assets/images/appstore.svg" class="h-[40px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter-from {
  transform: translate(100%, 0) !important;
}
.slide-leave-to {
  transform: translate(100%, 0) !important;
}
</style>


