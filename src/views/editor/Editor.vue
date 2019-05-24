<template>
    <div class="row justify-center">
        <q-modal v-model="opened" maximized>
            <q-layout>

                <div class="row justify-center">
                    <div class="col-7">
                        <h4>{{noteInfo.title}}</h4>
                    </div>
                    <div class="col-7">
                        <div v-html="viewContent">

                        </div>

                    </div>
                </div>
                <q-page-sticky position="bottom-right" :offset="[25, 25]">
                    <q-btn
                            color="warning"
                            @click="opened = false"
                            label="Close"
                            class="float-right"
                    />
                </q-page-sticky>
            </q-layout>
        </q-modal>

        <div class="col-12">
                    <q-toolbar style="height: 64px;" color="warning"  >
                        <q-btn flat round dense icon="arrow_back_ios" @click="jumpBack"  size="15px" />
                        <q-toolbar-title>
                            记录下自己的灵感
                        </q-toolbar-title>
                        <q-toggle v-model="checked" color="cyan" />
                        <q-btn flat round dense icon="remove_red_eye" @click="viewNote"  size="18px" />
                        <q-btn flat round dense icon="check" @click="addOrUpdateNote"  size="18px" />

                    </q-toolbar>
        </div>
        <div class="col-5"   style="margin-bottom: 15px">
            <q-input color="warning" v-model="noteInfo.title" float-label="标题" />
        </div>
        <div class="col-12">
            <div id="editor">

            </div>
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

                model:'',
                noteInfo:{
                    id:null,
                    title:null,
                    content:null,
                    publicVisible:null,
                },
                addOrUpdate:1,
                editor2:null,
                opened: false,
                checked:false,
                viewContent:null,
            }
        },
        watch:{
          checked(){
              this.noteInfo.publicVisible = this.checked?1:0
          }
        },
        mounted() {
            this.noteInfo.id = this.$route.params.id;
            if(this.noteInfo.id == null){
                this.addOrUpdate = 1
            }else{
                this.addOrUpdate = 0
            }

            this.noteInfo.title = this.$route.params.title;
            this.checked = this.$route.params.publicVisible;
            this.editor2 = new E('#editor')
            this.editor2.customConfig.uploadImgServer = '/upload'
            this.editor2.customConfig.linkImgCallback = function (url) {
                console.log(url) // url 即插入图片的地址
            }
            this.editor2.customConfig.zIndex = 3
            this.editor2.create()
            this.editor2.txt.html(this.$route.params.content)
        },
        methods:{
            publicVisibleComputed(){
                if(this.checked){
                    return 1;
                }else{
                    return 0;
                }
            },
            jumpBack(){
                this.$router.go(-1);
            },
            viewNote(){
                this. viewContent = this.editor2.txt.html()
                this.opened = true;
            },
            addOrUpdateNote(){
                console.log(this.checked)
                console.log(this.noteInfo.publicVisible)
                this.noteInfo.content = this.editor2.txt.html();
                let submitUrl = this.addOrUpdate == 1?'/api/note/addNote':'/api/note/updateNote'
                this.$axios({
                    method:'post',
                    url:submitUrl,
                    data:{
                        noteInfo:this.noteInfo
                    }
                }).then(response=>{
                    if(response.data.success){
                        this.clearNote();
                        this.$q.notify({
                            type: 'positive',
                            timeout: 2000,
                            position: 'top',
                            message:'操作成功'
                        })
                    }
                })
            },
            clearNote(){
                this.noteInfo.title = '';
                this.noteInfo.id = null;
                this.editor2.txt.clear();
                this.checked = false;
                this.addOrUpdate = 1;
            }
        },
    }
</script>

<style>
    .w-e-text-container{
        position: absolute;
        height: 580px !important;
        width: 100%;
    }
</style>
