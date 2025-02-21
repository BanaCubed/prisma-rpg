<template>
    <div class="header">
        <h2 class="title">Options</h2>
        <div class="option-tabs">
            <button class="option-tab-button" :class="{selected: isTab('behaviour')}" @click="setTab('behaviour')">Behaviour</button>
            <button class="option-tab-button" :class="{selected: isTab('appearance')}" @click="setTab('appearance')">Appearance</button>
        </div>
    </div>
    <div v-if="isTab('behaviour')" class="options-tab">
        <Toggle :title="unthrottledTitle" v-model="unthrottled" />
        <Toggle :title="autosaveTitle" v-model="autosave" />
        <FeedbackButton v-if="!autosave" class="button save-button" @click="save()">Manually save</FeedbackButton>
    </div>
    <div v-if="isTab('appearance')" class="options-tab">
        <Select :title="themeTitle" :options="themes" v-model="theme" />
        <SettingFields />
        <Toggle :title="alignModifierUnitsTitle" v-model="alignUnits" />
    </div>
</template>

<script setup lang="tsx">
import rawThemes from "data/themes";
import player from "game/player";
import settings, { settingFields } from "game/settings";
import { camelToTitle, Direction } from "util/common";
import { save } from "util/save";
import { render } from "util/vue";
import { computed, ref, toRefs } from "vue";
import Tooltip from "wrappers/tooltips/Tooltip.vue";
import FeedbackButton from "../../components/fields/FeedbackButton.vue";
import Select from "../../components/fields/Select.vue";
import Toggle from "../../components/fields/Toggle.vue";

const isOpen = ref(false);
const currentTab = ref("behaviour");

function isTab(tab: string): boolean {
    return tab == currentTab.value;
}

function setTab(tab: string) {
    currentTab.value = tab;
}

defineExpose({
    isTab,
    setTab,
    save,
    open() {
        isOpen.value = true;
    }
});

const themes = Object.keys(rawThemes).map(theme => ({
    label: camelToTitle(theme),
    value: theme
}));

const SettingFields = () => settingFields.map(f => render(f));

const { theme, unthrottled, alignUnits } = toRefs(settings);
const { autosave } = toRefs(player);

const unthrottledTitle = <span class="option-title">
    Unthrottled
    <desc>Allow the game to run as fast as possible. Not battery friendly.</desc>
</span>;
const autosaveTitle = <span class="option-title">
    Autosave<Tooltip display="Save-specific" direction={Direction.Right}>*</Tooltip>
    <desc>Automatically save the game every second or when the game is closed.</desc>
</span>;
const themeTitle = <span class="option-title">
    Theme
    <desc>How the game looks.</desc>
</span>;
const alignModifierUnitsTitle = <span class="option-title">
    Align modifier units
    <desc>Align numbers to the beginning of the unit in modifier view.</desc>
</span>;
</script>

<style>
.title {
    margin-top: 10px;
    display: block;
}

.option-tabs {
    border-bottom: 6px solid var(--outline);
    margin-top: 10px;
    margin-bottom: 10px;
    max-width: 660px;
}

.option-tab-button {
    background-color: transparent;
    color: var(--foreground);
    margin-bottom: -4px;
    font-size: 14px;
    cursor: pointer;
    padding: 5px 20px;
    border: none;
    border-bottom: 3px solid var(--background);
}

.option-tab-button:not(.selected) {
    border-bottom-color: transparent;
}

.options-tab {
    width: 600px;
}

.option-title .tooltip-container {
    display: inline;
    margin-left: 5px;
}

.option-title desc {
    display: block;
    opacity: 0.6;
    font-size: small;
    width: 300px;
    margin-left: 0;
    text-align: left;
}

.save-button {
    text-align: right;
}
</style>
