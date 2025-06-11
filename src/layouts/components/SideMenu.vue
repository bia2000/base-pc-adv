<template>
  <div>
    <img :src="Bus.getAssetsFile('layout/menu.png')" alt="" class="w-[30px] h-[30px] cursor-pointer" @click="visible = true" />
    <a-drawer v-model:visible="visible" class="" placement="left">
      <div v-if="!userStore.token">
        <div class="text-[24px] mb-8">{{ $t('mine.sideTips') }}</div>
        <a-space class="list-item">
          <img :src="Bus.getAssetsFile('mine/sale.png')" alt="" class="w-7 h-7" />
          <span>{{ $t('mine.sideTag1') }}</span>
        </a-space>
        <a-space class="list-item">
          <img :src="Bus.getAssetsFile('mine/query.png')" alt="" class="w-6 h-7" />
          <span>{{ $t('mine.sideTag2') }}</span>
        </a-space>
        <a-space class="list-item">
          <img :src="Bus.getAssetsFile('mine/safe.png')" alt="" class="w-6 h-7" />
          <span>{{ $t('mine.sideTag3') }}</span>
        </a-space>
        <div class="text-center">
          <a-button
            class="text-white w-[300px] h-14 bg-[#FD69FF] bg-opacity-50 border border-[#e561ed] rounded-[30px] my-6"
            @click="toRegister"
            >{{ $t('mine.sideBtn') }}</a-button
          >
          <a-button
            class="text-white w-[300px] h-14 bg-[#523682] bg-opacity-0 border border-[#e561ed] rounded-[30px]"
            @click="toLogin"
            >{{ $t('login.signIn') }}</a-button
          >
        </div>
      </div>
      <div v-else class="relative h-full">
        <div class="flex items-center space-x-4 mb-10">
          <a-avatar :size="48" :src="userStore.userInfo.avatar"> </a-avatar>
          <div>
            <div class="text-[24px]">{{ $t('mine.hi') + userStore.userInfo.name + ' !' }}</div>
            <div>{{ $t('mine.join') + '24 October, 2024' }}</div>
          </div>
        </div>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" @click="selectItem">
          <a-menu-item v-for="item in menuList" :key="item.key">
            <template #icon>
              <img :src="item.url" alt="" class="w-6 h-6" />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </a-menu>
        <a-button
          @click="logout"
          class="text-white w-[300px] h-14 bg-[#523682] bg-opacity-0 border border-[#e561ed] rounded-[30px] absolute bottom-5"
        >
          {{ $t('mine.signOut') }}
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script setup>
import i18n from '@/languages'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
let t = i18n.global.t
const visible = ref(false)
const router = useRouter()
const selectedKeys = ref([''])
const menuList = [
  {
    key: '1',
    name: 'home',
    title: t('mine.home'),
    url: Bus.getAssetsFile('mine/home.png')
  },
  {
    key: '2',
    name: 'profile',
    title: t('mine.user'),
    url: Bus.getAssetsFile('mine/profile.png')
  },
  {
    key: '3',
    name: 'invitation',
    title: t('mine.invitation.title'),
    url: Bus.getAssetsFile('mine/invitation.png')
  },
  {
    key: '4',
    name: 'favorite',
    title: t('mine.favorite'),
    url: Bus.getAssetsFile('mine/favorite.png')
  },
  {
    key: '5',
    name: 'orders',
    title: t('mine.orders.title'),
    url: Bus.getAssetsFile('mine/order.png')
  },
  {
    key: '6',
    name: 'members',
    title: t('mine.vip.members'),
    url: Bus.getAssetsFile('mine/members.png')
  },
  {
    key: '7',
    name: 'notice',
    title: t('mine.notifications'),
    url: Bus.getAssetsFile('mine/notifications.png')
  }
]
const toLogin = () => {
  router.push({ name: 'lMethod' })
  visible.value = false
}
const toRegister = () => {
  router.push({ name: 'rMethod' })
  visible.value = false
}
const selectItem = item => {
  menuList.forEach(e => {
    if (e.key === item.key) {
      router.push({ name: e.name })
      visible.value = false
      return
    }
  })
}
const logout = () => {
  userStore.setToken('')
  userStore.setUserInfo({})
  router.push({ name: 'home' })
  visible.value = false
}
</script>
<style lang="less" scoped>
.list-item {
  display: flex;
  margin-bottom: 20px;
}
.bg-opacity-50.ant-btn {
  &:hover,
  &:focus {
    background: rgba(253, 105, 255, 0.5);
    border: 1px solid#e561ed;
    color: #fff;
  }
}
.bg-opacity-0.ant-btn {
  background-color: #523682;
  border: 1px solid#e561ed;
  color: #fff;
}
:deep(.ant-menu.ant-menu-dark) {
  background-color: #402963;
  .ant-menu-item {
    border-radius: 14px;
  }
  .ant-menu-item-selected {
    border-radius: 14px;
    background: rgba(253, 105, 255, 0.3);
  }
}
</style>
