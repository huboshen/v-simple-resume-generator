<template>
    <div id="resume-wrapper" class="">
        <section class="sheet">
            <div id="title">
                <section class="row x-margin t-margin">
                    <div class="col-7">
                        <c-input
                            key="c-input-h1"
                            v-model:inputValue="resumeData.name"
                            :inputClasses="{ h1: true }"
                        />
                    </div>
                    <div class="col-5">
                        <template
                            v-for="contact in resumeData.contacts"
                            :key="contact.id"
                        >
                            <div style="display: flex; flex-direction: row;">
                                <c-input
                                    :key="'c-input-contact-label-' + contact.id"
                                    v-model:inputValue="contact.label"
                                    inputWidth="20mm"
                                    :inputClasses="{
                                        'f-bold': true,
                                    }"
                                />
                                <span
                                    :style="{
                                        visibility: contact.label
                                            ? 'visible'
                                            : 'hidden',
                                    }"
                                >
                                    :
                                </span>
                                <c-input
                                    :key="'c-input-contact-value-' + contact.id"
                                    v-model:inputValue="contact.value"
                                    inputWidth="60mm"
                                    :inputClasses="{
                                        'sm-l-margin': true,
                                    }"
                                />
                            </div>
                        </template>
                    </div>
                </section>
            </div>

            <section id="main-content">
                <div class="row x-margin" style="margin-top: 6mm">
                    <div class="col-7">
                        <c-section
                            v-model:sectionData="resumeData.left"
                        ></c-section>
                    </div>
                    <div class="col-5">
                        <c-section
                            v-model:sectionData="resumeData.right"
                        ></c-section>
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>

<script>
import ResumeJson from "@/data/simple-resume-generator/resume.json";
import { reactive } from "vue";
import CInput from "@/components/simple-resume-generator/CInput.vue";
import CSection from "@/components/simple-resume-generator/CSection.vue";

export default {
    name: "Page",
    props: {
        msg: String,
    },
    components: {
        CInput,
        CSection,
    },
    setup() {
        const resumeData = reactive(ResumeJson);

        return { resumeData };
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap");
@import "~@/styles/simple-resume-generator/_variables.scss";

@page {
    margin: 0;
    size: A4;
}

/** For screen preview **/
@media screen {
    #resume-wrapper {
        background: #e0e0e0;
        padding: 5mm 0;
        .sheet {
            margin: auto;
            background: white;
            box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
        }
    }
}

/** Fix for Chrome issue #273306 **/
@media print {
    #resume-wrapper {
        width: 210mm;
        -webkit-print-color-adjust: exact;
    }
}

#resume-wrapper {
    margin: 0;
    #title {
        overflow: auto;
        height: 36mm;
        background-color: rgb(0, 153, 204);
        color: white;
    }
    .sheet {
        width: 210mm;
        height: 296mm;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        page-break-after: always;
    }
    .x-margin {
        margin-left: $x-margin;
        margin-right: $x-margin;
    }
    .t-margin {
        margin-top: $t-margin;
    }
    .row {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .col-7 {
        width: 100mm;
        margin-right: auto;
    }
    .col-5 {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 86mm;
        flex: 0 0 86mm;
        max-width: 86mm;
    }

    ::v-deep() * {
        font-family: "Open Sans", sans-serif;
        letter-spacing: 0.2mm;
        font-size: 0.75 * $base-font-size;
    }
    ::v-deep() .sm-l-margin {
        margin-left: 1mm;
    }
    ::v-deep() .mb-2 {
        margin-bottom: 0.2 * $base-font-size;
    }
}
</style>
