<template>
  <div>
    <a-popover placement="bottomRight" trigger="click" v-model:visible="visible">
      <template #title>
        <div class="text-white mt-2">{{ $t('layout.notifications') }}</div>
      </template>
      <template #content>
        <div class="text-center" v-if="userStore.token">
          <div class="border-[#e561ed] rounded-2xl border overflow-hidden text-white p-5 text-left">
            <div class="flex items-center space-x-2">
              <img :src="Bus.getAssetsFile('layout/notice.png')" alt="" class="w-10 h-10" />
              <div class="flex-1">
                <div class="text-[18px]">账户验证</div>
                <div class="text-[#B5B5B5] w-[400px] truncate">
                  歡迎來到 XXXXXXX 您的電子郵件XXXX 您的電子郵件地址已通過驗證地址已通過
                </div>
              </div>
            </div>
          </div>
          <a-button
            shape="round"
            @click="toNotice"
            class="text-white w-[200px] h-9 bg-[#523682] border border-[#e561ed] mt-7 mb-2"
          >
            {{ $t('layout.allNotifications') }}
          </a-button>
        </div>
        <div v-else class="text-white flex flex-col items-center justify-center">
          <img :src="Bus.getAssetsFile('layout/bell-in.png')" alt="" class="w-10 h-10 mb-4" />
          <div class="text-[18px]">{{ $t('layout.noNotification') }}</div>
        </div>
      </template>
      <img :src="Bus.getAssetsFile('layout/bell.png')" alt="" class="w-6 h-[30px] cursor-pointer" />
    </a-popover>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const router = useRouter()
const visible = ref(false)
const isEmpty = ref(false)
const toNotice = () => {
  router.push({ name: 'notice' })
  visible.value = false
}
// onMounted(() => {
//   if (!userStore.token) isEmpty.value = true
//   else isEmpty.value = false
// })
</script>
<style lang="less" scoped>
:deep(.ant-btn:hover) {
  background-color: #523682;
  border-color: #e561ed;
  color: #fff;
}
:deep(.ant-btn:focus) {
  background-color: #523682;
  border-color: #e561ed;
  color: #fff;
}
</style>
