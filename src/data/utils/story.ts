import { main } from "data/projEntry";
import { createClickable } from "features/clickables/clickable";
import { computed, ComputedRef } from "vue";

export interface StoryEntry {
    name: string;
    description: string;
    completed: ComputedRef<boolean>;
}

export const activeStoryEntry = computed(() => {
    return story[main.storyProgress.value];
});

export const completedStoryEntries = computed(() => {
    const entries = [];
    for (let i = 0; i < main.storyProgress.value; i++) {
        entries.push(story[i]);
    }
    return entries;
});

const story: StoryEntry[] = [
    {
        name: "Originate",
        description: "<i>Come into existence...<br>Meet your summoner...</i><br><br>Visit the map.",
        completed: computed(() => main.exists.value === true)
    },
    {
        name: "Demo End",
        description: "Thanks for playing!",
        completed: computed(() => false)
    }
];

export default story;

export const existenceClickable = createClickable(() => ({
    display: {
        description: "Enter the portal..."
    },
    onClick() {
        main.exists.value = true;
    }
}));
