<template>
  <Result class="result"/>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import Result from '../components/Result.vue';

export default defineComponent({
  name: 'ResultView',

  components: {
    Result,
  },

  // setup() {
  //   document.body.className = "result";
  // },
});
</script>
