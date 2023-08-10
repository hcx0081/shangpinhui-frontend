<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/index.vue';
import TodayRecommend from '@/views/Home/TodayRecommend/index.vue';
import Rank from '@/views/Home/Rank/index.vue';
import Like from '@/views/Home/Like/index.vue';
import Floor from '@/views/Home/Floor/index.vue';
import Brand from '@/views/Home/Brand/index.vue';

export default {
  name: 'Login',
  components: { Brand, Floor, Like, Rank, TodayRecommend, ListContainer },
};
</script>

<style scoped>

</style>
