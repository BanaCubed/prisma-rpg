<template>
    <div id="container">
        <div class="box">
            <h1>
                Story
            </h1>
        </div>
    </div>
</template>

<script setup lang="tsx">

</script>

<style lang="css" scoped>
#container {
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    align-content: center;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: -10px;
}

.box {
    width: 350px;
    height: 450px;
    background: var(--raised-background);
    border-radius: var(--border-radius);
    margin: 10px;
    border: solid 4px rgba(0, 0, 0, 0.125);
    padding: 10px;
}
</style>