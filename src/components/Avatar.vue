<template>
  <img
    :src="avatar"
    class="avatar"
    :class="{
      'avatar-sm': avatarSm,
      'avatar-xl': avatarXl,
      'avatar-xxl': avatarXxl,
    }"
  />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object,
      default: null,
    },
    'avatar-sm': {
      type: Boolean,
      default: false,
    },
    'avatar-xl': {
      type: Boolean,
      default: false,
    },
    'avatar-xxl': {
      type: Boolean,
      default: false,
    },
    host: {
      type: String,
      default: process.env.VUE_APP_RAILS_URL,
    },
  },
  computed: {
    defaultAvatar() {
      return require('@/assets/images/user.svg');
    },
    avatar() {
      if (!this.user || (!this.user.avatar_url && !this.user.uploadedImage))
        return defaultAvatar;

      return this.user.uploadedImage
        ? this.user.uploadedImage
        : this.host + this.user.avatar_url;
    },
  },
};
</script>

<style lang="sass" scoped>
.avatar
  object-fit: cover
  width: 35px
  height: 35px
  border-radius: 50%
  background: inherit
  margin: 0 6px

.avatar-sm
  width: 20px
  height: 20px

.avatar-xl
  width: 100px
  height: 100px

.avatar-xxl
  width: 150px
  height: 150px
  margin: 0
</style>
