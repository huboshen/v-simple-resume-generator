<template>
    <div class="toolbar">
        <span
            class="icon icon-copy"
            @click="copyHandler"
            @mousedown="(e) => e.preventDefault()"
        ></span>
        <span
            class="icon icon-remove"
            @click="removeHandler"
            @mousedown="(e) => e.preventDefault()"
        ></span>
    </div>
</template>

<script>
export default {
    name: "Toolbar",
    emits: {
        copy: null,
        remove: null,
    },
    methods: {
        copyHandler() {
            this.$emit("copy");
        },
        removeHandler() {
            this.$emit("remove");
        },
    },
};
</script>

<style lang="scss" scoped>
.toolbar {
    display: none;
    background-color: rgb(14, 98, 201);
    padding: 1px;
    position: absolute;
    top: -21px;
    right: 0px;
    .icon {
        display: inline-block;
        padding: 3px;
        color: white;
        &:not(:last-child) {
            margin-right: 8px;
        }
        &:hover {
            background: white;
            color: rgb(14, 98, 201);
        }
    }
}
</style>
