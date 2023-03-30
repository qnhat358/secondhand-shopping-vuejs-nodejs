import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { CATEGORY_URL } from '../services/apiUrls'
export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  getters: {
  },
  actions: {
    async fetchCategoryList() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${CATEGORY_URL}`
        );
        this.categories = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})