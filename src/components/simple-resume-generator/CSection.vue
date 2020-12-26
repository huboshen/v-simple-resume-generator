<template>
    <div>
        <div
            v-for="section in sectionData"
            :key="section.id"
            class="section-wrapper"
        >
            <!-- h2 -->
            <template v-if="'h2' in section">
                <c-input
                    :key="'c-input-section-h2-' + section.id"
                    v-model:inputValue="section.h2"
                    :inputClasses="{ h2: true }"
                    :wrapperClasses="{ 'h2-wrapper': true }"
                />
            </template>
            <!-- content -->
            <template v-if="'content' in section">
                <template v-for="(cinput, index) in section.content">
                    <template v-if="'h3' in cinput">
                        <c-input
                            :key="'c-input-section-' + index + '_h3'"
                            htmlTag="textarea"
                            v-model:inputValue="cinput.h3"
                            :inputClasses="{ h3: true }"
                        />
                    </template>

                    <template v-if="'h4' in cinput">
                        <c-input
                            :key="'c-input-section-' + index + '_h4'"
                            v-model:inputValue="cinput.h4"
                            :inputClasses="{ h4: true }"
                        />
                    </template>

                    <template v-if="'ul' in cinput">
                        <div class="ul" :key="index + '_ul'">
                            <c-input
                                v-for="(li, i) in cinput.ul"
                                :key="
                                    'c-input-section-' + index + '_' + i + '_li'
                                "
                                htmlTag="textarea"
                                v-model:inputValue="li.li"
                                :wrapperClasses="{ li: true }"
                                :inputClasses="{ li: true }"
                            />
                        </div>
                    </template>

                    <template v-if="'textarea' in cinput">
                        <c-input
                            :key="'c-input-section-textarea' + index"
                            htmlTag="textarea"
                            v-model:inputValue="cinput.textarea"
                        />
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import CInput from "@/components/simple-resume-generator/CInput.vue";

export default {
    name: "CSection",
    components: {
        CInput,
    },
    props: {
        sectionData: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.ul:not(:last-child) {
    margin-bottom: 16px;
}
.section-wrapper {
    margin-bottom: 6mm;
}
</style>
