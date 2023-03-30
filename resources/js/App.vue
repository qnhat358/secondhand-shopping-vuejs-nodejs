<script setup>
import { useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import LoaderModal from './components/common/LoaderModal.vue'

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();

const currentLayout = computed(() => {
  switch (route.meta.layout) {
    case "DefaultLayout":
      return DefaultLayout;
    default:
      return DefaultLayout;
  }
});

const isRouterLoaded = computed(() => {
  if (route.name !== null) return true;
  return false;
});

watch(
  route,
  (to) => {
    document.title = to.meta.title;
  },
  { flush: "pre", immediate: true, deep: true }
);
</script>

<template>
  <!-- Layout component -->
  <LoaderModal/>
  <div class="w-full mx-auto flex justify-center items-center">
    <component :is="currentLayout" v-if="isRouterLoaded">
      <RouterView />
    </component>
  </div>
</template>

<style lang="scss">
@import "@assets/base.css";
#app {
  font-weight: normal;
}
#page {
  position: relative;
}
</style>
