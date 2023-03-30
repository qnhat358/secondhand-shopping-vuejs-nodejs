import { useAuthStore } from "@/stores/auth";
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";
export function registerGuard(router) {
  router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth) {
      const { fetchUserById } = useUserStore();
      const { isAuthenticated } = storeToRefs(useAuthStore());
      console.log(isAuthenticated.value);
      if (!isAuthenticated.value) {
        await fetchUserById();
      }
    }

    return true;
  });
}
