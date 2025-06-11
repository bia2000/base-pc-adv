<script setup></script>

<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script setup>
// 多语言
// import { getBrowserLang } from '_u/tools'
// import { useI18n } from 'vue-i18n'
// import { useGlobalStore } from '@/stores/modules/global'
// import enUS from 'ant-design-vue/es/locale/en_US'
// import zhCN from 'ant-design-vue/es/locale/zh_CN'
// const i18n = useI18n()
// const globalStore = useGlobalStore()

// // element language
// const locale = computed(() => {
//   // if (globalStore.language == 'zh') return zhCN
//   // if (globalStore.language == 'en') return enUS
//   // return getBrowserLang() == 'zh' ? zhCN : enUS
//   return enUS
// })
onMounted(() => {
  // const language = globalStore.language ?? getBrowserLang()
  // const language = 'en'
  // i18n.locale.value = language
  // globalStore.setGlobalState('language', language)
})
</script>
<style lang="less">
@import '@/assets/style/base.less';
</style>
