<script>
export default {
  name: 'NavBar',
  data() {
    return {};
  },
  methods: {},
};
</script>
<template>
  <div class="column is-2">
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <router-link to="/products">Products</router-link>
        <router-link to="/about">About</router-link>
      </ul>
    </nav>
  </div>
</template>
