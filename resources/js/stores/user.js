import { defineStore } from 'pinia'
import http from '../services/http'
import jwtDecode from 'jwt-decode'
import { useAuthStore } from './auth'
import { storeToRefs } from 'pinia'
import { useLoaderStore } from "@/stores/loader";

import { USER_BY_ID_URL } from '../services/apiUrls'
export const useUserStore = defineStore('user', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    async fetchUserById() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);

      const { user, isAuthenticated } = storeToRefs(useAuthStore())
      const accessToken = localStorage.getItem('accessToken');
      try {
        const id = jwtDecode(accessToken).UserID;
        const response = await http.get(
          `${USER_BY_ID_URL}`.replace(":id", id)
        );
        user.value = response.data.data;
        isAuthenticated.value = true;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})