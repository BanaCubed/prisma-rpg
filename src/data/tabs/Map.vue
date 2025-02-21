<template>
    The Map
    <Spacer />
    <Portal class="portal" />
</template>

<script setup lang="tsx">
import Spacer from 'components/layout/Spacer.vue';
import { existenceClickable } from 'data/utils/story';
import { render } from 'util/vue';


const Portal = () => render(existenceClickable)
</script>

<style lang="css" scoped>
.portal :deep(.clickable) {
    background-color: hsl(270, 100%, 15%);
    color: var(--foreground);
    border-radius: 50%;
    --size: min(80vw, 80vh);
    height: var(--size);
    width: var(--size);
    transform: none;
    box-shadow: none;
    font-size: calc(var(--size) * 0.05)
}
</style>
