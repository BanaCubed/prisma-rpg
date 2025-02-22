<template>
    <div id="prismaHeader">
        <!-- <h1 style="padding-left: 10px;">Prisma</h1> -->
        <div id="headerFiller" />
        <Transition>
            <div :key="tab" class="subtabs">
                <div style="flex-grow: 1;" />
                <button
                    v-for="tabButton in activeTab.subtabs"
                    :disabled="!tabButton.active.value"
                    :aria-label="tabButton.name"
                    :class="{'menuButton': true, 'activeTab': subtabs[activeTab.tab] === tabButton.tab}"
                    :style="{'--background': tabButton.active.value ? tabButton.color : 'hsl(0, 0%, 15%)', '--length': tabButton.name.length}"
                    v-on:click="() => {subtabs[activeTab.tab] = tabButton.tab}"
                >
                    <span class="material-icons">{{ tabButton.active.value ? tabButton.icon : "lock" }}</span>
                </button>
                <!-- <div id="headerFiller" /> -->
            </div>
        </Transition>
        <button
            v-for="tabButton in tabs"
            :disabled="!tabButton.active.value"
            :aria-label="tabButton.name"
            :class="{'menuButton': true, 'activeTab': tab === tabButton.tab}"
            :style="{'--background': tabButton.active.value ? tabButton.color : 'hsl(0, 0%, 15%)', '--length': tabButton.name.length}"
            v-on:click="() => {tab = tabButton.tab}"
        >
            <span class="material-icons">{{ tabButton.active.value ? tabButton.icon : "lock" }}</span>
        </button>
        <!-- <div id="headerFiller" /> -->
    </div>
</template>

<script setup lang="tsx">
import { tabs, tab, activeTab, subtabs } from './tabs';


</script>

<style lang="css" scoped>
.subtabs {
    /* background-color: red; */
    position: absolute;
    height: fit-content;
    width: max(600px, 100vw);
    right: 10px;
    top: 49px;
    display: flex;
    overflow-x: auto;
    transition: none;
}

#prismaHeader {
    height: fit-content;
    background-color: var(--background);
    margin-top: -50px;
    width: max(600px, 100vw);
    margin-left: -10px;
    display: flex;
    overflow-x: auto;
    /* box-shadow: 0 -4px 0 rgba(0, 0, 0, 0.125) inset; */
    transition: none;
}

#headerFiller {
    flex-grow: 1;
}

.menuButton {
    margin-left: 5px;
    margin-right: -21px;
    padding-left: 20px;
    padding-right: 20px;
    height: 50px;
    background-color: var(--background);
    border: none;
    color: var(--foreground);
    min-width: 72px;
    width: 72px;
    overflow: clip;
    font-size: 1em;
    clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%);
    box-shadow: 0 -99px 0 -100px rgba(255, 255, 255, 0.125) inset;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    text-shadow: 0 0 5px black;
    position: relative;
}

.menuButton::after {
    content: attr(aria-label);
    color: transparent;
    text-shadow: 0 0 5px transparent;
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    margin-right: 5px;
}

.menuButton:hover::after {
    color: inherit;
    text-shadow: 0 0 5px black;
}

.menuButton:disabled::after {
    content: "Locked";
}

.menuButton .material-icons {
    font-size: 2em;
    display: block;
    /* margin-right: 5px; */
    margin: 0px;
}

.menuButton.activeTab {
    box-shadow: 0 -106px 0 -100px rgba(255, 255, 255, 0.125) inset;
}

.menuButton:hover {
    box-shadow: 0 -151px 0 -100px rgba(255, 255, 255, 0.125) inset;
    min-width: calc(77px + calc(var(--length) * 9.6px));
}

.menuButton:disabled {
    color: rgb(from var(--foreground) r g b / 0.4);
}

/* .menuButton:disabled:not(:last-child) {
    width: 0px;
    min-width: 0px;
    padding-left: 0px;
    padding-right: 0px;
    margin-left: 0px;
    margin-right: 0px;
} */

.menuButton:last-child {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 15px 100%);
    margin-right: 0px;
    padding-right: 7px;
    min-width: 57px;
    width: 57px;
}

.menuButton:last-child:hover {
    min-width: calc(62px + calc(var(--length) * 9.6px));
}

#prismaHeader > .menuButton:last-child {
    min-width: 72px;
    width: 72px;
    padding-right: 20px;
}

#prismaHeader > .menuButton:last-child:hover {
    min-width: calc(77px + calc(var(--length) * 9.6px));
}

.v-enter-from,
.v-leave-to {
    translate: 0 -50px;
}

.v-enter-to,
.v-leave-from {
    translate: 0 0px;
}

.v-enter-active,
.v-leave-active {
    transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
