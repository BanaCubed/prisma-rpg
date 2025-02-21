import { TabName } from "data/tabs/tabs";
import { computed } from "vue";

export interface StoryEntry {
    name: string;
    description: string;
    tab: TabName;
}

const story: StoryEntry[] = [
    {
        name: "Originate",
        description: "Come into existence...",
        tab: "map",
    }
]

export default story;

export const activeStoryEntry = computed(() => {
    
})
