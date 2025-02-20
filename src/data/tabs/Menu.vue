<template>
    <h1>
        title
        <John />
    </h1>
</template>

<script setup lang="tsx">
import { render } from 'util/vue';
import wordShift from 'util/word-shift';
import { h, ref } from 'vue';

const things = ref(["avocado", "seventeen", "johnson"]);

function constructComponent() {
    let element = <></>
    element = <>{element}<p>{Date.now()}</p></>
    console.log(7)
    return element
}

const John = () => render(constructComponent());
</script>

<style lang="css" scoped>

</style>
