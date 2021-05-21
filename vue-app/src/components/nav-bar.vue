<script>
export default {
  name: 'NavBar',
  data() {
    return {
      userInfo: {
        type: Object,
        default() {},
      },
      providers: ['twitter', 'github', 'aad'],
      redirect: window.location.pathname,
    };
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      } catch (error) {
        console.error('No profile could be found');
        return undefined;
      }
    },
  },
  async created() {
    this.userInfo = await this.getUserInfo();
  },
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
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <template v-if="!userInfo">
          <template v-for="provider in providers">
            <a
              :key="provider"
              :href="`/.auth/login/${provider}?post_login_redirect_uri=${redirect}`"
              >{{ provider }}</a
            >
          </template>
        </template>
        <a
          v-if="userInfo"
          :href="`/.auth/logout?post_logout_redirect_uri=${redirect}`"
          >Logout</a
        >
      </div>
    </nav>
    <div class="user" v-if="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo.userDetails }}</p>
      <p>{{ userInfo.identityProvider }}</p>
    </div>
  </div>
</template>
