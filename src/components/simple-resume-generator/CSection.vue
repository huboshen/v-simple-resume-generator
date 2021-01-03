<template>
    <div>
        <div
            v-for="(section, sectionIndex) in sectionData[sectionKey]"
            :key="`c-input||${sectionKey}.${sectionIndex}.content`"
            :cID="`c-input||${sectionKey}.${sectionIndex}.content`"
            class="section-wrapper"
        >
            <!-- h2 -->
            <template v-if="'h2' in section">
                <c-input
                    :key="`c-input||${sectionKey}.${sectionIndex}.h2`"
                    :cID="`c-input||${sectionKey}.${sectionIndex}.h2`"
                    v-model:inputValue="section.h2"
                    :inputClasses="{ h2: true }"
                    :wrapperClasses="{ 'h2-wrapper': true }"
                />
            </template>
            <!-- content -->
            <template v-if="'content' in section">
                <div
                    v-for="(cinput, contentIndex) in section.content"
                    :key="'c-section-wrapper' + contentIndex"
                    class="c-section-wrapper"
                    :class="{ 'has-toolbar': hasToolBar(section) }"
                >
                    <template v-if="'h3' in cinput">
                        <c-input
                            :key="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.h3`
                            "
                            :cID="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.h3`
                            "
                            htmlTag="textarea"
                            v-model:inputValue="cinput.h3"
                            :inputClasses="{ h3: true }"
                        />
                    </template>

                    <template v-if="'h4' in cinput">
                        <c-input
                            :key="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.h4`
                            "
                            :cID="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.h4`
                            "
                            v-model:inputValue="cinput.h4"
                            :inputClasses="{ h4: true }"
                        />
                    </template>

                    <template v-if="'ul' in cinput">
                        <div
                            class="ul"
                            :key="'c-input||' + contentIndex + '_ul'"
                        >
                            <c-input
                                v-for="(li, i) in cinput.ul"
                                :key="
                                    `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.ul.${i}`
                                "
                                :cID="
                                    `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.ul.${i}`
                                "
                                htmlTag="textarea"
                                v-model:inputValue="li.li"
                                :wrapperClasses="{ li: true }"
                                :inputClasses="{ li: true }"
                                @copy="copyHandler"
                                @remove="removeHandler"
                            />
                        </div>
                    </template>

                    <template v-if="'textarea' in cinput">
                        <c-input
                            :key="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.textarea`
                            "
                            :cID="
                                `c-input||${sectionKey}.${sectionIndex}.content.${contentIndex}.textarea`
                            "
                            htmlTag="textarea"
                            v-model:inputValue="cinput.textarea"
                        />
                    </template>
                    <toolbar
                        @copy="copySectoinHandler(sectionIndex, contentIndex)"
                        @remove="
                            removeSectionHandler(sectionIndex, contentIndex)
                        "
                    ></toolbar>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import CInput from "@/components/simple-resume-generator/CInput.vue";
import Toolbar from "@/components/simple-resume-generator/Toolbar";

export default {
    name: "CSection",
    emits: {
        copy: null,
        remove: null,
    },
    components: {
        CInput,
        Toolbar,
    },
    props: {
        sectionData: {
            type: Object,
            required: true,
        },
        sectionKey: {
            type: String,
            required: true,
        },
    },
    methods: {
        copyHandler($event) {
            this.$emit("copy", $event);
        },
        removeHandler($event) {
            this.$emit("remove", $event);
        },
        copySectoinHandler(sectionIndex, contentIndex) {
            // get cID
            const cID = `c-input||${this.sectionKey}.${sectionIndex}.content.${contentIndex}`;
            this.$emit("copy", cID);
        },
        removeSectionHandler(sectionIndex, contentIndex) {
            // get cID
            const cID = `c-input||${this.sectionKey}.${sectionIndex}.content.${contentIndex}`;
            this.$emit("remove", cID);
        },
        hasToolBar(section) {
            return section.hasToolBar;
        },
    },
};
</script>

<style lang="scss">
.section-wrapper {
    margin-bottom: 6mm;
}
.c-section-wrapper {
    margin-bottom: 3mm;
}
.c-section-wrapper.has-toolbar:focus-within {
    position: relative;
    background-color: rgba(14, 98, 201, 0.2);
    border-radius: 1px;
    & > .toolbar {
        display: block !important;
    }
}
</style>
