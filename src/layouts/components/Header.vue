<template>
  <div class="layout-header">
    <div class="layout-header-left space-x-5">
      <side-menu />
      <img :src="Bus.getAssetsFile('layout/homeLogo.png')" alt="" class="w-[180px]" />
    </div>
    <div class="layout-header-right space-x-6">
      <search />
      <notice-item />
      <Points v-if="userStore.token" />
      <a-button shape="round" class="register-btn" @click="router.push({ name: 'rMethod' })" v-if="visible && !userStore.token">
        {{ $t('login.signUp') }}
      </a-button>
    </div>
  </div>
</template>
<script setup>
import SideMenu from './SideMenu'
import NoticeItem from './NoticeItem'
import Points from './Points'
import Search from './Search'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const router = useRouter()
const visible = ref(true)
watch(
  () => router.currentRoute,
  newVal => {
    if (newVal) visible.value = !router.currentRoute.value.fullPath.includes('register')
  },
  {
    deep: true
  }
)
onMounted(() => {})
</script>
<style lang="less" scoped>
.layout-header {
  color: #fff;
  display: flex;
  padding: 0 10%;
  justify-content: space-between;
  &-left,
  &-right {
    display: flex;
    align-items: center;
  }
  .register-btn {
    background-color: #9b69ff;
    color: #fff;
    border: solid 1px #9b69ff;
    height: 40px;
  }
}

:deep(.ant-space-item) {
  display: flex;
  align-items: center;
}
:deep(.ant-input) {
  background-color: rgba(155, 105, 255, 0.3);
  border-radius: 20px;
  border: 1px solid #e561ed;
  border-right: 0;
  color: #fff;
  &::placeholder {
    color: #fff;
  }
  &:focus,
  &:hover {
    border: 1px solid #e561ed;
    border-right: 0;
  }
}
:deep(.ant-input-search-button) {
  border-radius: 0 20px 20px 0 !important;
  color: #fff !important;
}
:deep(.ant-input-group-addon) {
  background-color: transparent;
  .ant-btn {
    background-color: #6644aa;
    border: 1px solid #e561ed;
    border-left: 0;
  }
}
</style>
