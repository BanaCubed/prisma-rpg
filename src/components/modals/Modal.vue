<template>
    <teleport to="#modal-root">
        <transition
            name="modal"
            @before-enter="isAnimating = true"
            @after-leave="isAnimating = false"
            appear
        >
            <div
                class="modal-mask"
                v-show="modelValue"
                v-on:pointerdown.self="close"
                v-bind="$attrs"
            >
                <div class="modal-wrapper">
                    <div class="modal-container" :width="width">
                        <div class="modal-header">
                            <!--
                                @slot Modal Header
                                  @binding {boolean} shown Whether the modal is currently open or animating
                              -->
                            <slot name="header" :shown="isOpen" />
                        </div>
                        <div class="modal-body">
                            <Context ref="contextRef">
                                <!--
                                    @slot Modal Body
                                      @binding {boolean} shown Whether the modal is currently open or animating
                                  -->
                                <slot name="body" :shown="isOpen" />
                            </Context>
                        </div>
                        <div class="modal-footer">
                            <!--
                                @slot Modal Footer
                                  @binding {boolean} shown Whether the modal is currently open or animating
                              -->
                            <slot name="footer" :shown="isOpen">
                                <div class="modal-default-footer">
                                    <div class="modal-default-flex-grow"></div>
                                    <button class="button modal-default-button" @click="close">
                                        Close
                                    </button>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import type { FeatureNode } from "game/layers";
import { computed, ref } from "vue";
import Context from "../Context.vue";

const props = defineProps<{
    modelValue: boolean;
    preventClosing?: boolean;
    width?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const isOpen = computed(() => props.modelValue || isAnimating.value);
function close() {
    if (props.preventClosing !== true) {
        emit("update:modelValue", false);
    }
}

const isAnimating = ref(false);

const contextRef = ref<typeof Context | null>(null);
const nodes = computed<Record<string, FeatureNode | undefined> | null>(
    () => contextRef.value?.nodes ?? null
);

defineExpose({ isOpen, nodes });
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.modal-container {
    width: 640px;
    max-width: 95vw;
    max-height: 95vh;
    background-color: var(--background);
    padding: 20px;
    border-radius: 5px;
    transition: all 0.3s ease;
    text-align: left;
    border: var(--modal-border);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.modal-header {
    width: 100%;
}

.modal-body {
    margin: 20px 0;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.modal-footer {
    width: 100%;
}

.modal-default-footer {
    display: flex;
}

.modal-default-flex-grow {
    flex-grow: 1;
}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
