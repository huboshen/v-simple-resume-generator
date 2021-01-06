<script>
import { h } from "vue";
import mixinAutoResize from "@/mixins/autoResize.js";
import Toolbar from "@/components/simple-resume-generator/Toolbar";

export default {
    name: "CInput",
    mixins: [mixinAutoResize],
    emits: {
        copy: null,
        remove: null,
        "update:inputValue": null,
    },
    props: {
        cID: {
            type: String,
            required: true,
        },
        inputValue: {
            type: String,
            required: true,
        },
        inputClasses: {
            type: Object,
        },
        wrapperClasses: {
            type: Object,
            default: () => {
                return {};
            },
        },
        inputWidth: {
            type: String,
            default: "100%",
        },
        htmlTag: {
            type: String,
            default: "input",
        },
        lineHeight: {
            type: Number,
            default: 1.6,
        },
    },
    render() {
        const additionalElementsBefore = [];
        const additionalElementsAfter = [];
        if (this.wrapperClasses.li) {
            additionalElementsBefore.push(
                h(
                    "div",
                    {
                        style: {
                            width: "3.5mm",
                            display: "inline-block",
                            "font-weight": "bold",
                            "line-height": this.lineHeight,
                        },
                    },
                    "• "
                )
            );
            additionalElementsAfter.push(
                h(Toolbar, {
                    onCopy: () => {
                        this.$emit("copy", this.cID);
                    },
                    onRemove: () => {
                        this.$emit("remove", this.cID);
                    },
                })
            ); // add a toolbar component
        }
        const inputAttributes = {
            rows: 1,
            class: Object.assign(
                {
                    "borderless-input": true,
                    "dashed-border": false,
                },
                this.inputClasses
            ),
            style: {
                width: this.inputWidth,
                resize: "none",
                "line-height": this.lineHeight,
                "flex-grow": 1,
            },
            value: this.inputValue,
            onInput: ($event) => {
                const tagName = $event.target.tagName;
                console.log("tagName", tagName);
                if (tagName === "DIV") {
                    this.$emit("update:inputValue", $event.target.innerHTML);
                } else {
                    this.$emit("update:inputValue", $event.target.value);
                }
            },
        };
        let thisTag = "input";
        if (this.htmlTag === "textarea") {
            thisTag = "div";
            inputAttributes.contenteditable = true;
        }
        return h(
            "div",
            {
                class: Object.assign(
                    { "cinput-wrapper": true },
                    this.wrapperClasses
                ),
                style: {
                    display: "flex",
                    "flex-direction": "row",
                    "align-items": "stretchs",
                },
            },
            [
                ...additionalElementsBefore,
                h(thisTag, inputAttributes, this.inputValue),
                ...additionalElementsAfter,
            ]
        );
    },
};
</script>

// Vue 3 SFC currently doesn't support scoped styles for manually render
functions. (13 DEC 2020) // ref: https://github.com/vuejs/vue-next/issues/1539
<style lang="scss">
@import "~@/styles/simple-resume-generator/_variables.scss";

.cinput-wrapper {
    position: relative;
    width: 100%;
    * {
        font-weight: 300;
        padding: 0;
    }
    h1 {
        font-weight: 700;
        font-size: 1.2 * $base-font-size !important;
        margin-top: 0;
        margin-block-start: 0em;
        margin-block-end: 1.2rem;
    }
    h2 {
        font-weight: 700;
        font-size: 1.05 * $base-font-size !important;
        margin-top: 0;
        font-weight: 700;
        &:not(:first-child) {
            margin-block-start: 1.2rem;
        }
        margin-block-end: 1.2rem;
    }
    &.h2-wrapper {
        &::before {
            font-size: 18px;
            font-weight: bold;
            content: "|";
            margin-right: 2mm;
            color: rgb(184, 184, 184);
            // color: rgb(236, 121, 91);
        }
    }
    h3 {
        font-weight: 700;
        font-size: 0.9 * $base-font-size !important;
        margin-block-end: 0;
        margin-block-start: 0rem;
        margin-block-end: 0mm;
    }
    h4 {
        font-size: 0.75 * $base-font-size !important;
        margin-top: 2mm;
        // margin-bottom: 2mm;
        font-weight: 300;
        margin-block-start: 0.5rem;
        margin-block-end: 0mm;
    }
    .borderless-input {
        color: inherit;
        border: 0;
        background-color: inherit;
    }
    .dashed-border {
        border: 0.5mm dashed rgb(247, 118, 118);
    }
    .borderless-input:focus {
        color: black;
        background-color: white;
    }
    .h1 {
        @extend h1;
    }
    .h2 {
        @extend h2;
    }
    .h3 {
        @extend h3;
    }
    .h4 {
        @extend h4;
    }
    .f-light {
        font-weight: 300;
    }
    .f-bold {
        font-weight: 700;
    }
    div[contenteditable="true"] {
        white-space: pre-wrap;
    }
    input:focus,
    div[contenteditable="true"]:focus {
        & ~ .toolbar {
            display: block !important;
        }
    }
}
</style>
