<template>
  <img
    :src="avatar"
    class="avatar"
    :class="{
      'avatar-sm': props.avatarSm,
      'avatar-xl': props.avatarXl,
      'avatar-xxl': props.avatarXxl,
    }"
  />
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
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
  setup(props) {
    const defaultAvatar = require('@/assets/images/user.svg');

    const avatar = computed(() => {
      if (!props.user || (!props.user.avatar_url && !props.user.uploadedImage))
        return defaultAvatar;

      return props.user.uploadedImage
        ? props.user.uploadedImage
        : props.host + props.user.avatar_url;
    });

    return {
      props,
      avatar,
      defaultAvatar,
    };
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
