import type { Layer } from "game/layers";
import { createLayer } from "game/layers";
import { persistent } from "game/persistence";
import { Player } from "game/player";
import { DecimalSource } from "util/bignum";
import { computed, ref } from "vue";
import "./styles/common/common.css";
import "./styles/pc/header.css";
import Menu from "./tabs/Menu.vue";
import { TabName } from "./tabs/tabs";

/**
 * @hidden
 */
export const main = createLayer("main", l => {
    const items = persistent<number[]>([]);
    const gold = persistent<DecimalSource>(0);
    const storyProgress = persistent<number>(0);

    const tab = ref<TabName>("menu");
    const fullscreen = ref<boolean>(false);

    l.on("update", () => {
        fullscreen.value = window.innerHeight === screen.height;
    });

    // Note: layers don't _need_ a reference to everything,
    //  but I'd recommend it over trying to remember what does and doesn't need to be included.
    // Officially all you need are anything with persistency or that you want to access elsewhere
    return {
        name: "Prisma",
        minimizable: false,
        display: () => (
            <>
                <div id="prismaHeader">
                    <h1 style="padding-left: 10px;">Prisma</h1>
                    <button
                        aria-label="Home"
                        id="mainMenuButton"
                        class="menuButton"
                        onClick={() => {
                            tab.value = "menu";
                        }}
                    >
                        <span class="material-icons">home</span>
                    </button>
                    <div style="flex-grow: 1;" />
                    <button
                        aria-label="Info"
                        id="infoMenuButton"
                        class="menuButton"
                        onClick={() => {
                            tab.value = "info";
                        }}
                    >
                        <span class="material-icons">info</span>
                    </button>
                    <button
                        aria-label={fullscreen.value ? "Shrink" : "Expand"}
                        id="fullMenuButton"
                        class="menuButton"
                        onClick={() => {
                            if (window.innerHeight !== screen.height) {
                                document.body.requestFullscreen().catch();
                            } else {
                                document.exitFullscreen().catch();
                            }
                        }}
                    >
                        <span class="material-icons">
                            {fullscreen.value ? "fullscreen_exit" : "fullscreen"}
                        </span>
                    </button>
                    <button
                        aria-label="Options"
                        id="optsMenuButton"
                        class="menuButton"
                        onClick={() => {
                            tab.value = "options";
                        }}
                    >
                        <span class="material-icons">settings</span>
                    </button>
                </div>
                {tab.value === "menu" ? <Menu /> : null}
            </>
        ),
        items,
        gold,
        tab
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
