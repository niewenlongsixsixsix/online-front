<template>
    <div class="row justify-center">

        <div class="col-12">
                <q-layout>
                    <q-toolbar style="height: 64px;" color="warning"  >
                        <q-toolbar-title>
                            记录下自己的灵感
                        </q-toolbar-title>
                        <q-btn flat round dense icon="check"  size="18px" />
                    </q-toolbar>
                <div id="editor">

                </div>
                </q-layout>
        </div>


    </div>
</template>

<script>
    import E from 'wangeditor'
    import QCard from "quasar-framework/src/components/card/QCard";
    export default {
        name: "Editor",
        components: {QCard},
        data(){
            return{
                model:''
            }
        },
        mounted() {
            let editor2 = new E('#editor')
            editor2.create()
        }
    }
</script>

<style>
    .w-e-text-container{
        position: absolute;

        height: 820px !important;
        width: 100%;
    }
</style>