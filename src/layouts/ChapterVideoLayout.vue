<template>
    <div class="chapterVideoLayout" style="position: relative;">

        <!-- 仅包装一个DOM元素/组件的示例 -->
        <transition
                appear
                enter-active-class="animated slideInDown"
                leave-active-class="animated slideOutUp"
        >
            <!-- 仅包装一个由QBtn定义的DOM元素 -->
            <div v-if="slideList" style="  position: absolute; height: 100%; width: 300px; right: 0px; z-index: 99999; background: #fff;">
                    <ChapterList>

                    </ChapterList>
            </div>
        </transition>

        <q-layout>
            <q-page-container>
                <div class="row">
                    <div class="col-12">
                        <q-toolbar color="warning" >
                            <q-btn flat round @click="back" icon="fas fa-hand-point-left"  style="font-size: 20px" />
                            <q-toolbar-title>
                                大型电商系统商品数据库设计
                            </q-toolbar-title>
                            <q-btn flat round  icon="create" to="/editor" style="font-size: 25px" />
                        </q-toolbar>

                        <div class="row justify-start">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-10">
                                        <q-card style="padding: 30px;">
                                            <video style="width: 100%;"controls >
                                                <source src="/api/image/upload/video/10/2019032611112949256.mp4" type="video/mp4">
                                            </video>
                                        </q-card>
                                    </div>
                                    <div class="col-2">
                                        <q-scroll-area style="width: 100%; height: 825px;">
                                            <ChapterList ></ChapterList>
                                        </q-scroll-area>

                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>

    import E from 'wangeditor'
    import QPageContainer from "quasar-framework/src/components/layout/QPageContainer";
    import ChapterList from "@/views/courseDetail/ChapterList";
    import QToolbar from "quasar-framework/src/components/toolbar/QToolbar";
    import QCard from "quasar-framework/src/components/card/QCard";
    import QCardMain from "quasar-framework/src/components/card/QCardMain";
    import QCardTitle from "quasar-framework/src/components/card/QCardTitle";
    import {WOW} from 'wowjs';
    import QLayoutFooter from "quasar-framework/src/components/layout/QLayoutFooter";
    import CourseShow from "@/views/CourseShow";
    export default {
        name: "ChapterVideoLayout",
        components: {QLayoutFooter, QCardTitle, QCardMain, QCard, QToolbar, QPageContainer,ChapterList,CourseShow},
        data(){
            return{
                slideList:false,
                drawer:false,
                model:"",
                newCourseList:[],//最热笔记列表
            }
        },
        mounted() {
            new WOW().init();
            this.getNewCourseList();
        },
        methods:{
            back(){
                this.$route.push('/courseInfo');
            },
            //获取最新的课程
            getNewCourseList(){
                this.$axios({
                    method:'get',
                    url:'https://www.easy-mock.com/mock/5ca888dd4f62671c250622bb/course/newCourseList'
                }).then(response=>{
                    this.newCourseList = response.data.newCourseList
                })
            }
        },
    }
</script>

<style>
    .chapterVideoLayout .q-card-container{
        padding: 0px;
    }

    .chapterVideoLayout .q-layout-drawer{
        width: 300px !important;
    }

</style>