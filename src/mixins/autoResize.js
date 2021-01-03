// ref: https://medium.com/@adamorlowskipoland/vue-auto-resize-textarea-3-different-approaches-8bbda5d074ce

// autoResize.js
export default {
    methods: {
        mixin_autoResize_resize() {
            // event.target.style.height = "auto";
            // event.target.style.height = `${event.target.scrollHeight}px`;
        },
    },
    watch: {
        inputValue: {
            immediate: true,
            handler: function() {
                // this.$nextTick(() => {
                //     const textareaNode = this.$refs.cTextarea
                //     if (textareaNode) {
                //         let calHeight = textareaNode.scrollHeight;
                //         console.log('calHeight', calHeight);
                //         console.log(textareaNode.value);
                //         textareaNode.style.height = `${calHeight}px`;
                //     }
                // });
            },
        },
    },
};
