import type { Layer } from "game/layers";
import { createLayer } from "game/layers";
import { persistent } from "game/persistence";
import { Player } from "game/player";
import { DecimalSource } from "util/bignum";
import { computed } from "vue";
import "./styles/common/common.css";
import Menu from "./tabs/Menu.vue";
import { tab, Tabs } from "./tabs/tabs";
import Options from "./tabs/Options.vue";
import Header from "./tabs/Header.vue";
import Map from "./tabs/Map.vue";
import story from "./utils/story";

/**
 * @hidden
 */
export const main = createLayer("main", () => {
    const items = persistent<number[]>([]);
    const gold = persistent<DecimalSource>(0);

    const storyProgress = computed<number>(completed => {
        completed = completed ?? 0;
        while (story[completed].completed.value === true) {
            completed++;
        }
        return completed;
    });

    const exists = persistent<boolean>(false);

    // Note: layers don't _need_ a reference to everything,
    //  but I'd recommend it over trying to remember what does and doesn't need to be included.
    // Officially all you need are anything with persistency or that you want to access elsewhere
    return {
        name: "Prisma",
        minimizable: false,
        display: () => (
            <>
                <Header />
                {tab.value === Tabs.Home ? (
                    <Menu />
                ) : tab.value === Tabs.Options ? (
                    <Options />
                ) : tab.value === Tabs.Map ? (
                    <Map />
                ) : null}
            </>
        ),
        items,
        gold,
        storyProgress,
        exists
    };
});

/**
 * Given a player save data object being loaded, return a list of layers that should currently be enabled.
 * If your project does not use dynamic layers, this should just return all layers.
 */
export const getInitialLayers = (
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    player: Partial<Player>
): Array<Layer> => [main];

/**
 * A computed ref whose value is true whenever the game is over.
 */
export const hasWon = computed(() => {
    return false;
});

/**
 * Given a player save data object being loaded with a different version, update the save data object to match the structure of the current version.
 * @param oldVersion The version of the save being loaded in
 * @param player The save data being loaded in
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function fixOldSave(
    oldVersion: string | undefined,
    player: Partial<Player>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
): void {}
/* eslint-enable @typescript-eslint/no-unused-vars */
