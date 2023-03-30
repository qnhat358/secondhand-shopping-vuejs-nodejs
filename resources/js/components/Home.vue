<script setup>
import SlideImageGroup from "./common/SlideImageGroup.vue";
import FeedbackCard from "./home/FeedbackCard.vue";
import { storeToRefs } from "pinia";
import { useFeedbackStore } from "@/stores/feedback.js";
import { useCategoryStore } from "@/stores/category.js";
import { onMounted, ref } from "vue";

const {fetchFeedbackList} = useFeedbackStore();
const {feedbacks} = storeToRefs(useFeedbackStore());

const {fetchCategoryList} = useCategoryStore();
const {categories} = storeToRefs(useCategoryStore());

const categoryImgs = ref([]);

onMounted( async () => {
   fetchFeedbackList();
   await fetchCategoryList();
  categoryImgs.value = categories.value.map((item)=>{
    return item.CategoryImage;
  })
});
</script>

<template>
  <div class="flex items-center justify-between mx-auto w-[1240px] px-8 mb-11">
    <div>
      <div class="main-banner flex justify-center mt-5 mb-10">
        <div class="main-banner__text">
          <p class="font-bold mb-4">SELL YOUR STUFF & BAG A BARGAIN.</p>
          <p class="font-bold">Whatever it is. Shpock it.</p>
        </div>
        <img
          src="@assets/images/main-banner.jpg"
          class="rounded-3xl w-full"
        />
      </div>
      <div class="content-container text-center">
        <p class="font-bold mb-4">Discover your treasure</p>
        <p class="font-bold mb-8">Over 11 million items to buy</p>
        <div class="categories w-full">
          <SlideImageGroup v-if="categories.length" :options=categoryImgs></SlideImageGroup>
          <div
            class="flex justify-end content-center pr-8 text-black font-bold"
            style="cursor: pointer"
          >
            <p class="underline font-bold mt-5">Search all categories</p>
            <p class="font-bold mt-5">&nbsp;></p>
          </div>
        </div>
        <div class="feedback mt-[48px] mb-[32px]">
          <p class="font-bold mb-[32px] text-3xl leading-[42px]">
            See what Shpockers are saying
          </p>
          <div
            class="grid feedback-items grid-cols-3 gap-4 text-left w-full items-start"
          >
            <div
              v-for="n in 3"
              :key="n"
              class="feedback-items-column space-y-4"
            >
              <FeedbackCard
              v-if="feedbacks.length"
                :comment="feedbacks[2 * n - 2].Comment"
                :rateNumber="feedbacks[2 * n - 2].Rating"
                :rateFrom="feedbacks[2 * n - 2].Store"
                :rater="feedbacks[2 * n - 2].UserName"
              />
              <FeedbackCard
              v-if="feedbacks.length"
                :comment="feedbacks[2 * n - 1].Comment"
                :rateNumber="feedbacks[2 * n - 1].Rating"
                :rateFrom="feedbacks[2 * n - 1].Store"
                :rater="feedbacks[2 * n - 1].UserName"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center relative">
          <div
            class="w-[1160px] absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 grid grid-cols-6"
          >
            <div
              class="col-span-3 flex justify-center content-center flex-col text-black"
            >
              <p class="font-bold text-[30px] leading-[42px]">
                Zero fees. Zero hassle.
              </p>
              <p class="font-bold text-[64px] leading-[74px]">SIMPLE</p>
            </div>
            <div
              class="col-start-5 col-end-7 flex justify-center items-center flex-col"
            >
              <img
                src="@assets/images/shpock.svg"
                class="max-w-none h-[42px]"
              />
              <div class="flex flex-row mt-[20px] gap-[12px]">
                <img src="@assets/images/googleplay.svg" class="h-[40px]" />
                <img src="@assets/images/appstore.svg" class="h-[40px]" />
              </div>
            </div>
          </div>
          <img
            src="@assets/images/download-banner.jpg"
            class="rounded-xl w-[1160px]"
          />
        </div>
        <div class="text-left mt-[52px]">
          <p class="font-bold text-[16px] leading-[22px] mb-1">
            What is Shpock?
          </p>
          <p class="text-[16px] leading-[22px]">
            Shpock is a marketplace and classifieds platform that brings
            millions of private buyers and sellers across the United Kingdom
            together - London, Brighton, Birmingham, Bristol, Manchester,
            Leicester and Liverpool are amongst the most active areas for second
            hand shopping. You can buy & sell beautiful used & new things in
            various categories which range from electronics, fashion, items for
            babies as well as children and furniture for home & garden to
            specialised interests such as cars and property.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body {
  width: 1240px;
}
.main-banner {
  height: auto;
  position: relative;
  text-align: center;
  color: black;
  font-size: 64px;
  line-height: 74px;
  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 700px;
    :nth-child(2) {
      font-size: 30px;
      line-height: 42px;
    }
  }
}

.content-container {
  > p:nth-child(1) {
    font-size: 30px;
    line-height: 42px;
  }
  > p:nth-child(2) {
    font-size: 16px;
    line-height: 22px;
  }
  .feedback {
    :deep .the-card--variant-outlined {
      border: 1px solid rgb(222, 225, 222);
    }
  }
}

.download-banner {
  height: auto;
  position: relative;
  text-align: center;
  color: black;
  font-size: 30px;
  line-height: 42px;
  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 700px;
    :nth-child(2) {
      font-size: 64px;
      line-height: 74px;
    }
  }
}
</style>


