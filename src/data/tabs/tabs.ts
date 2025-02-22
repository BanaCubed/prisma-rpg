import { main } from "data/projEntry";
import { computed, ComputedRef, ref } from "vue";

export enum Tabs {
    Home,
    Map,
    Items,
    Dungeon,
    Quests,
    Collection,
    Info,
    Options
}

export enum Subtabs {
    Behavior = 0,
    Appearance = 1,
    Saves = 2
}

export interface TabButtonData {
    /**
     * The ID of the tab to use. Should be taken with consideration of the enum `Tabs`
     */
    tab: Tabs;
    /**
     * The display name of the tab (appears when hovered). Not to be used for comparisons.
     */
    name: string;
    /**
     * The icon displayed on the tab button. Should be an icon from material icons.
     */
    icon: string;
    /**
     * A `ComputedRef` representing whether the tab should be visible.
     */
    active: ComputedRef<boolean>;
    /**
     * The color of the tab button.
     */
    color: string;
    /**
     * An array of subtabs displayed when the tab is active. Subtabs currently don't support sub-subtabs.
     */
    subtabs?: SubtabButtonData[];
}

export interface SubtabButtonData {
    /**
     * The ID of the subtab to use. Should be taken with consideration of the enum `Subtabs`
     */
    tab: Subtabs;
    /**
     * The display name of the tab (appears when hovered). Not to be used for comparisons.
     */
    name: string;
    /**
     * The icon displayed on the tab button. Should be an icon from material icons.
     */
    icon: string;
    /**
     * A `ComputedRef` representing whether the tab should be visible.
     */
    active: ComputedRef<boolean>;
    /**
     * The color of the tab button.
     */
    color: string;
}

/**
 * An ordered array that represents the tabs displayed to the user.
 *
 * It is recommended to add new tabs to the start of the array.
 */
export const tabs: TabButtonData[] = [
    {
        // Items
        tab: Tabs.Items,
        name: "Items",
        icon: "backpack",
        active: computed(() => false),
        color: "hsl(40, 100%, 15%)"
    },
    {
        // Dungeon
        tab: Tabs.Dungeon,
        name: "Dungeon",
        icon: "castle",
        active: computed(() => false),
        color: "hsl(270, 100%, 15%)"
    },
    {
        // Quests
        tab: Tabs.Quests,
        name: "Quests",
        icon: "web_stories",
        active: computed(() => false),
        color: "hsl(60, 100%, 15%)"
    },
    {
        // Collection
        tab: Tabs.Collection,
        name: "Lists",
        icon: "menu_book",
        active: computed(() => false),
        color: "hsl(220, 100%, 15%)"
    },
    {
        // Map
        tab: Tabs.Map,
        name: "Map",
        icon: "map",
        active: computed(() => true),
        color: "hsl(200, 100%, 15%)"
    },
    {
        // Info
        tab: Tabs.Info,
        name: "Info",
        icon: "info",
        active: computed(() => main.storyProgress.value >= 1),
        color: "hsl(180, 100%, 15%)"
    },
    {
        // Options
        tab: Tabs.Options,
        name: "Options",
        icon: "settings",
        active: computed(() => main.storyProgress.value >= 1),
        color: "hsl(0, 0%, 20%)",
        subtabs: [
            {
                // Saves
                tab: Subtabs.Saves,
                name: "Saves",
                icon: "save",
                active: computed(() => true),
                color: "hsl(0, 0%, 20%)"
            },
            {
                // Appearance
                tab: Subtabs.Appearance,
                name: "Visuals",
                icon: "palette",
                active: computed(() => true),
                color: "hsl(0, 0%, 20%)"
            },
            {
                // Behavior
                tab: Subtabs.Behavior,
                name: "Gameplay",
                icon: "extension",
                active: computed(() => true),
                color: "hsl(0, 0%, 20%)"
            }
        ]
    },
    {
        // Home
        tab: Tabs.Home,
        name: "Home",
        icon: "home",
        active: computed(() => true),
        color: "hsl(120, 100%, 15%)"
    }
];

/**
 * A `Ref` representing the current tab.
 */
export const tab = ref<Tabs>(Tabs.Home);
export const activeTab = computed(() => tabs.filter(t => t.tab === tab.value)[0]);

/**
 * An incredibly janky `Ref` of an array representing the current subtabs.
 */
export const subtabs = ref<Record<number, Subtabs>>([]);
tabs.forEach(t => {
    if (t.subtabs === undefined) {
        return;
    }
    subtabs.value[t.tab] = 0;
});
