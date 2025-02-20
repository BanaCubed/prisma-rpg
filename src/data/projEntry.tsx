import type { Layer } from "game/layers";
import { createLayer } from "game/layers";
import { persistent } from "game/persistence";
import { Player } from "game/player";
import Decimal, { DecimalSource, format } from "util/bignum";
import { computed, ref } from "vue";
import Menu from "./tabs/Menu.vue";
import wordShift from "util/word-shift";
import { createUpgrade } from "features/clickables/upgrade";
import { createBooleanRequirement } from "game/requirements";
import { render } from "util/vue";

/**
 * @hidden
 */
export const main = createLayer("main", l => {
    const items = persistent<number[]>([]);
    const gold = persistent<DecimalSource>(0);

    const tab = ref("menu");

    const upg = createUpgrade(() => ({
        requirements: createBooleanRequirement(() => false),
        display() {
            return Date.now().toString()
        },
    }));

    // Note: layers don't _need_ a reference to everything,
    //  but I'd recommend it over trying to remember what does and doesn't need to be included.
    // Officially all you need are anything with persistency or that you want to access elsewhere
    return {
        name: "Prisma",
        minimizable: false,
        display: () => (
            <>
                {tab.value === "menu" ? (
                    <><Menu />{render(upg)}{format(gold.value)}</>
                ) : (
                    <>Not Menu</>
                )}
            </>
        ),
        items,
        gold,
        tab,
        upg
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
