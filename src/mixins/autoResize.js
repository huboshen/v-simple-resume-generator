// ref: https://medium.com/@adamorlowskipoland/vue-auto-resize-textarea-3-different-approaches-8bbda5d074ce

// autoResize.js
export default {
    methods: {
        mixin_autoResize_resize(event) {
            event.target.style.height = "auto";
            event.target.style.height = `${event.target.scrollHeight}px`;
        },
    },
    mounted() {
        this.$nextTick(() => {
            const textareaNode = this.$el.getElementsByTagName("textarea")[0];
            if (textareaNode) {
                let calHeight = textareaNode.scrollHeight;
                textareaNode.style.height = `${calHeight}px`;
            }
        });
    },
};
