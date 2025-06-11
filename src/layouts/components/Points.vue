<template>
  <div class="points">
    <a-popover placement="bottomRight" trigger="click">
      <template #title>
        <div class="text-white mt-2">{{ $t('layout.rewards') }}</div>
      </template>
      <template #content>
        <div class="border-[#e561ed] rounded-2xl border overflow-hidden text-white">
          <div class="flex items-center space-x-2 bg-[#9B69FF] p-2">
            <img :src="Bus.getAssetsFile('layout/reward.png')" alt="" class="w-3.5 h-4 ml-2" />
            <span>{{ $t('layout.totalRewards') }}</span>
          </div>
          <div class="h-14 p-2 leading-10 ml-2">{{ 123 + ' (valor$) ' }}</div>
        </div>
      </template>
      <img :src="Bus.getAssetsFile('layout/points.png')" alt="" class="w-[30px] h-[30px] cursor-pointer" />
    </a-popover>
  </div>
</template>
<script setup></script>
<style lang="less" scoped>
// :deep(.ant-popover-inner) {
//   background-color: #402963;
//   border-bottom: none;
//   color: #fff;
// }
</style>
