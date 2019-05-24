<template>
    <div class="chapterVideoLayout">
        <q-layout>
            <q-page-container>
                <div class="row">
                    <div class="col-12">
                        <q-toolbar color="warning" >
                            <q-btn flat round @click="back" icon="fas fa-hand-point-left"  style="font-size: 20px" />
                            <q-toolbar-title>
                                {{smallChapterInfo.title}}
                            </q-toolbar-title>
                            <q-btn flat round  icon="create" to="/editor" style="font-size: 20px" />
                        </q-toolbar>

                        <div class="row justify-center">
                            <div class="col-9">
                                        <q-card style="padding: 20px;">
                                            <video style="width: 100%; "controls >
                                                <source :src="'/api/upload' + smallChapterInfo.videoUrl" type="video/mp4">
                                            </video>
                                        </q-card>
                            </div>
                        </div>

                    </div>
                </div>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>

    import QPageContainer from "quasar-framework/src/components/layout/QPageContainer";
    import ChapterList from "@/views/courseDetail/ChapterList";
    import QToolbar from "quasar-framework/src/components/toolbar/QToolbar";
    import QCard from "quasar-framework/src/components/card/QCard";
    import QCardMain from "quasar-framework/src/components/card/QCardMain";
    import QCardTitle from "quasar-framework/src/components/card/QCardTitle";
    import QLayoutFooter from "quasar-framework/src/components/layout/QLayoutFooter";
    import CourseShow from "@/views/course/CourseShow";
    export default {
        name: "ChapterVideoLayout",
        components: {QLayoutFooter, QCardTitle, QCardMain, QCard, QToolbar, QPageContainer,ChapterList,CourseShow},
        data(){
            return{
                slideList:false,
                drawer:false,
                videoUrl:'',
                model:"",
                smallChapterInfo:null
            }
        },
        mounted() {
            this.$axios({
                method:'get',
                url:'/api/smallChapter/getSmallChapterByPrimaryKey/' + this.$route.params.smallChapterId
            }).then(response=>{
                this.smallChapterInfo = response.data
                console.log(this.smallChapterInfo)
            })
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
        },
    }
</script>

<style>
   .chapterVideoLayout{
       position: absolute;
       width: 100%;
       height: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
   }
</style>
