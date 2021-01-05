<template>
    <div id="page">
        <div class="btn-group">
            <button
                id="print-btn"
                type="button"
                class="btn"
                @click="printWindow()"
            >
                Print
            </button>
        </div>
        <div id="resume-wrapper" class="">
            <section class="sheet">
                <div id="title">
                    <section class="row x-margin t-margin">
                        <div class="col-7">
                            <c-input
                                :key="`c-input||h1`"
                                :cID="`c-input||h1`"
                                v-model:inputValue="resumeData.name"
                                :inputClasses="{ h1: true }"
                            />
                        </div>
                        <div class="col-5">
                            <template
                                v-for="(contact,
                                contactIndex) in resumeData.contacts"
                                :key="contact.id"
                            >
                                <div
                                    style="display: flex; flex-direction: row;"
                                >
                                    <c-input
                                        :key="
                                            `c-input||contacts.${contactIndex}.label`
                                        "
                                        :cID="
                                            `c-input||contacts.${contactIndex}.label`
                                        "
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
                                        :key="
                                            `c-input||contacts.${contactIndex}.value`
                                        "
                                        :cID="
                                            `c-input||contacts.${contactIndex}.value`
                                        "
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
                                v-model:sectionData="resumeData"
                                sectionKey="left"
                                @copy="copyHandler"
                                @remove="removeHandler"
                            ></c-section>
                        </div>
                        <div class="col-5">
                            <c-section
                                v-model:sectionData="resumeData"
                                sectionKey="right"
                                @copy="copyHandler"
                                @remove="removeHandler"
                            ></c-section>
                        </div>
                    </div>
                </section>
            </section>
        </div>
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
    methods: {
        modifyDataGenerator($event) {
            const dataKey = this.getDataKey($event);
            const data = this.getClone(this.dataGet(this.resumeData, dataKey));
            const previousLayerKey = this.getPreviousDataLayer(dataKey);
            const previousLayerDataArray = this.dataGet(
                this.resumeData,
                previousLayerKey
            );
            let splitKey = null;
            if (Array.isArray(previousLayerDataArray)) {
                splitKey = parseInt(this.getSplitKey(dataKey));
            }
            return {
                dataKey,
                data,
                previousLayerKey,
                previousLayerDataArray,
                splitKey,
            };
        },
        copyHandler($event) {
            console.log($event);
            const {
                data,
                previousLayerDataArray,
                splitKey,
            } = this.modifyDataGenerator($event);
            console.log("data", data);
            console.log("previousLayerDataArray", previousLayerDataArray);
            console.log("splitKey", splitKey);
            if (splitKey !== null) {
                previousLayerDataArray.splice(splitKey, 0, data);
            }
        },
        removeHandler($event) {
            const {
                previousLayerDataArray,
                splitKey,
            } = this.modifyDataGenerator($event);
            if (splitKey !== null) {
                previousLayerDataArray.splice(splitKey, 1);
            }
        },
        getClone(data) {
            return JSON.parse(JSON.stringify(data));
        },
        getDataKey(cInputKey) {
            return cInputKey.split("||")[1];
        },
        getSplitKey(dataKey) {
            const dataKeyArray = dataKey.split(".");
            return dataKeyArray[dataKeyArray.length - 1];
        },
        getPreviousDataLayer(str) {
            return str.replace(/\.[A-Za-z0-9]*$/, "");
        },
        dataGet(data, path) {
            if (!path) return undefined;
            let found = true;
            path.split(".").forEach(function(v) {
                if (data[v]) {
                    data = data[v];
                } else {
                    found = false;
                    return;
                }
            });
            return found ? data : undefined;
        },
        printWindow() {
            window.print();
        },
    },
};
</script>
<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;700&display=swap");
@import "~@/styles/simple-resume-generator/_icons.scss";
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/styles/simple-resume-generator/_variables.scss";
@page {
    margin: 0;
    size: A4;
}

/** For screen preview **/
@media screen {
    #page {
        background: #e0e0e0;
    }
    #resume-wrapper {
        padding-bottom: 10mm;
        background: #e0e0e0;
        .sheet {
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
    .btn-group {
        display: none;
    }
}

.sheet-width {
    width: 210mm;
    margin: auto;
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
        @extend .sheet-width;
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

.btn-group {
    padding: 2mm 0;
    @extend .sheet-width;
    text-align: right;

    .btn {
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 1.5;
        position: relative;
        overflow: hidden;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        text-transform: uppercase;
        white-space: normal;
        border: 0;
        border-radius: 0.125rem;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
            0 2px 10px 0 rgba(0, 0, 0, 0.12);
        color: #fff;
        background-color:rgb(0, 153, 204) !important;
        appearance: none;
        cursor: pointer;
        padding: 0.5rem 1.6rem;
        font-size: 0.64rem;
    }
}
</style>
