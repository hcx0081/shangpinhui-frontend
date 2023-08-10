<template>
  <div>
    <Header/>

    <router-view></router-view>

    <Footer v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue';
import Footer from '@/components/Footer/index.vue';

export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted() {
    this.$store.dispatch('typeNav/list');
  },
};
</script>

<style>
#nprogress .bar {
  background: red !important;
}
</style>
