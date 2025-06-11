<template>
  <div class="flex flex-col justify-center items-center text-center py-[100px]">
    <img src="@/assets/img/error.png" class="w-[200px] h-[150px] mt-40" alt="404" />
    <div class="text-white text-[26px] my-16 w-[300px]">{{ $t('layout.errorTips') }}</div>
    <a-button
      type="primary"
      @click="router.push({ name: 'home' })"
      class="bg-[#523682] w-[328px] h-[45px] rounded-[20px] border-[#e561ed]"
    >
      {{ $t('layout.backBtn') }}
    </a-button>
  </div>
</template>

<script setup name="404">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped lang="less"></style>
