import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { PRODUCT_URL } from '../services/apiUrls'
export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    filterValue: {
      category: '',
      location: '',
      price: '',
      dateListed: '',
      sort: '',
    }
  }),
  getters: {
  },
  actions: {
    async fetchProductList() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${PRODUCT_URL}`
        );
        this.products = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})