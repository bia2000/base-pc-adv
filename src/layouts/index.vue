<template>
  <a-layout>
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout-content>
      <div class="max-w-[2400px] min-w-[1000px] w-full">
        <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer>
      <Footer></Footer>
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import Header from './components/Header'
import Footer from './components/Footer'
</script>
<style lang="less" scoped>
.ant-layout {
  display: flex;
  min-height: 100vh;
  min-width: 1000px;
  &-header {
    background-color: #4c337d;
    padding: 0;
  }
  &-content {
    display: flex;
    justify-content: center;
    background: url('_img/layout/bg.png') no-repeat;
    background-size: cover;
    background-position: center;
    padding: 0;
  }
  &-footer {
    padding: 0;
  }
}
</style>
