<template>
  <div class="text-base text-white">
    <div class="py-10 px-10% flex bg-[#3B1A3E] h-[160px] space-x-20 w-full">
      <div>
        <div class="text-lg mb-2">{{ $t('layout.forPublishers') }}</div>
        <div>{{ $t('layout.footerTips2') }}</div>
        <div>{{ $t('layout.footerTips3') }}</div>
      </div>
      <div>
        <div class="text-lg mb-2">{{ $t('layout.needHelp') }}</div>
        <div class="bg-[#622A65] rounded py-1 px-2">
          <img :src="Bus.getAssetsFile('layout/phone.png')" alt="" class="w-4 h-4 inline-block" /> {{ $t('layout.footerTips5') }}
        </div>
      </div>
      <div>
        <div class="text-lg mb-2">{{ $t('layout.Country') }}</div>
        <div class="bg-[#622A65] rounded py-1 px-2 cursor-pointer" @click="router.push({ name: 'region' })">
          <img :src="Bus.getRequestFile(globalStore.areaCover)" alt="" class="w-10 h-6 inline-block" />
          {{ globalStore.area }}
        </div>
        <div class="flex w-[120px] justify-between mt-2 text-[#858585]">
          <div v-for="item in langArr" :key="item.value" @click="selectLang(item)" :class="{ selected: item.value === lang }">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#422862] h-10 leading-10">
      <div class="flex space-x-12 ml-[160px] text-[#858585]">
        <div>© Copyright Coda Payments</div>
        <div>{{ $t('layout.footerTips7') }}</div>
        <div>{{ $t('layout.footerTips8') }}</div>
        <div>{{ $t('layout.footerTips9') }}</div>
        <div>{{ $t('layout.footerTips10') }}</div>
        <div>{{ $t('layout.footerTips11') }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/modules/global'
const globalStore = useGlobalStore()
const router = useRouter()
const lang = ref('en')
const langArr = [
  {
    name: 'English',
    value: 'en'
  },
  {
    name: '中文',
    value: 'zh'
  }
]
const selectLang = item => {
  lang.value = item.value
}
</script>
<style lang="less" scoped>
.selected {
  color: #fff;
  padding: 0 8px;
  background: url('_img/home/title-bg1.png') no-repeat;
  background-size: 100% 50%; /* 背景图片高度为元素高度的一半 */
  background-repeat: no-repeat;
  background-position: center bottom;
}
</style>
