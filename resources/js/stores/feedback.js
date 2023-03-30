import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { RANDOM_FEEDBACK_URL } from '../services/apiUrls'
export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: [],
  }),
  getters: {
  },
  actions: {
    async fetchFeedbackList() {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${RANDOM_FEEDBACK_URL}`
        );
        this.feedbacks = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})