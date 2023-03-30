import { defineStore } from 'pinia'
import http from '../services/http'
import axios from 'axios'
import { useLoaderStore } from "@/stores/loader";

import { LOGIN_URL, LOGOUT_URL, REFRESH_URL } from '../services/apiUrls'



export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    isAuthenticated: false,
    loginForm: {
      email: '',
      password: '',
    },
    registerForm: {
      email: '',
      password: '',
      rePassword: '',
    },
  }),
  getters: {
  },
  actions: {
    async login() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await axios.post(
          `http://127.0.0.1:3000/api${LOGIN_URL}`, this.loginForm
        );
        localStorage.setItem('accessToken', response.data.data.accessToken);
        this.user = response.data.data.user;
        this.isAuthenticated = true;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
    async logout() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${LOGOUT_URL}`
        );
        localStorage.removeItem('accessToken');
        this.isAuthenticated = false;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
    async refreshToken() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${REFRESH_URL}`
        );
        this.isAuthenticated = true;
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})