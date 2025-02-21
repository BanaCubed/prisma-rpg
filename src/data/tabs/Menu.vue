<template>
    <div id="container">
        <div class="box">
            <h1>
                Story
            </h1>
            <div class="activeStory">
                <h3 class="activeName">
                    {{ activeStoryEntry.name }}
                </h3>
                <br>
                <span class="activeDesc" v-html="activeStoryEntry.description" />
            </div>
            <h4
                style="color: rgb(from var(--foreground) r g b / 0.4)"
                v-for="entry in completedStoryEntries"
            >
                {{ entry.name }}
            </h4>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { activeStoryEntry, completedStoryEntries } from 'data/utils/story';


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
    height: fit-content;
    background: var(--raised-background);
    border-radius: var(--border-radius);
    margin: 10px;
    border: solid 0px rgba(0, 0, 0, 0.125);
    padding: 10px;
}

.activeStory {
    margin-top: 10px;
    margin-bottom: 10px;
}

.activeName {
    font-size: 1.3em;
}

.activeDesc {
    font-size: 0.8em;
    color: rgb(from var(--foreground) r g b / 0.6)
}
</style>