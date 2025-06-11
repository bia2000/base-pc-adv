<template>
  <div class="flex items-center w-[20vw] search">
    <a-dropdown v-model:visible="searchVisible" trigger="contextmenu" overlayClassName="w-full mt-2">
      <a-input-search v-model:value="searchValue" :placeholder="$t('layout.searchPlaceholder')" size="large" @search="onSearch" />
      <template #overlay>
        <div class="bg-[#402963] pt-16 pb-8 text-white border-[#e561ed] rounded-2xl border">
          <div v-if="loading" class="flex items-center justify-center h-full">
            <img :src="Bus.getAssetsFile('layout/searching.png')" alt="" class="w-32 h-32" />
            <span class="text-lg">{{ $t('layout.loading') }}</span>
          </div>
          <div v-else class="h-full">
            <div class="px-[10%]" v-if="data.length">
              <good-list
                :list="data"
                :limit="4"
                idLabel="areaProductId"
                urlLabel="detailCoverPath"
                nameLabel="areaProductName"
                :col="4"
              />
              <div class="text-center" v-if="data.length > 6">
                <div class="border-[#e561ed] border my-5"></div>
                <a-button type="link" class="text-lg text-white hover:text-white" @click="toMore">
                  {{ $t('layout.viewTips1') + searchValue + $t('layout.viewTips2') }}
                </a-button>
              </div>
            </div>
            <div class="flex items-center justify-center h-full space-x-2" v-else>
              <img :src="Bus.getAssetsFile('layout/empty.png')" alt="" class="w-32 h-32" />
              <span class="text-lg">{{ $t('layout.noResult') }}</span>
            </div>
          </div>
        </div>
      </template>
    </a-dropdown>
    <!-- <a-input-search v-model:value="searchValue" :placeholder="$t('layout.searchPlaceholder')" size="large" @search="onSearch" />
    <a-drawer v-model:visible="searchVisible" :closable="false" placement="top" class="text-white">
      <div v-if="!loading" class="flex items-center justify-center h-full">
        <img :src="Bus.getAssetsFile('layout/searching.png')" alt="" class="w-32 h-32" />
        <span>{{ $t('layout.loading') }}</span>
      </div>
      <div v-else class="h-full">
        <div class="flex items-center justify-center h-full space-x-2">
          <img :src="Bus.getAssetsFile('layout/empty.png')" alt="" class="w-32 h-32" />
          <span>{{ $t('layout.noResult') }}</span>
        </div>
      </div>
    </a-drawer> -->
  </div>
</template>

<script setup>
import GoodList from '_c/GoodList/index'
import { useGlobalStore } from '@/stores/modules/global'
const globalStore = useGlobalStore()
const router = useRouter()
const searchVisible = ref(false)
const searchValue = ref()
const onSearch = async () => {
  if (!searchValue.value) return
  loading.value = true
  const { retCode, result } = await Requests.listAreaProductPage({
    areaId: globalStore.areaId,
    areaProductName: searchValue.value,
    pageSize: 100,
    pageNumber: 1
  })
  if (retCode === '000') {
    data.value = result.records
    searchVisible.value = true
  }
  loading.value = false
}
const loading = ref(false)
const data = ref([])
const toMore = () => {
  searchVisible.value = false
  router.replace({
    name: 'search',
    query: {
      name: searchValue.value
    }
  })
}
onMounted(() => {})
</script>

<style lang="less" scoped>
:deep(.ant-input-lg) {
  height: 40px;
}
</style>
