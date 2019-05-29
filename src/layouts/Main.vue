<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main">

        <!--轮播图组件-->
        <MCarousel :HeadLineList="HeadLineList">
            <template  slot-scope="props" >
            <q-carousel-slide class="cursor-pointer" @click.native="JumpCourseInfo(props.msg.createForCourse)"  :key="props.msg.id" :img-src="'/api/upload/' + props.msg.imgUrl">
            </q-carousel-slide>
            </template>
        </MCarousel>



        <!--最新课程组件-->
        <CourseShow class=" wow slideInUp " style="background: rgb(243,243,243); visibility: visible;" v-bind:imgList="newCourseList">
            <!--左侧标题-->
            <template v-slot:courseTitle>
                <span style="padding:2px; font-size: 20px; height: 80px; line-height: 80px; border-bottom: 2px #8d84cc solid; color: #4d555d; font-weight: bold;">
                最新课程
                </span>
            </template>
            <!--右下角刷新方式-->
            <template v-slot:changeText>
                <span @click="jumpMoreCourseList" style="color: #8d84cc;">
                更多&nbsp;<q-icon name="refresh"/>
                </span>
            </template>

            <template slot-scope="props">
                <div class="col-3"  @click="JumpCourseInfo(props.item.id)">
                    <q-card-media  class="shadow-10"   style="border-radius:10px">
                        <img class="m-img" :src="'/api/upload/' + props.item.imgUrl">
                        <!-- 注意slot="overlay" -->
                        <q-card-title slot="overlay" class="cursor-pointer">
                            <div key="title" >
                                {{props.item.title}}
                            </div>
                        </q-card-title>

                    </q-card-media>
                </div>
            </template>
        </CourseShow>

        <!--最热课程组件-->
        <CourseShow style="background: rgb(255,255,255);" v-bind:imgList="hotCourseList" >
            <!--左侧标题-->
            <template v-slot:courseTitle>
                <span style="padding:2px; font-size: 20px; height: 80px; line-height: 80px; border-bottom: 2px chocolate solid; color: #4d555d; font-weight: bold;">
                热门课程
                </span>
            </template>
            <!--右下角刷新方式-->
            <template v-slot:changeText>
                <span style="color: #cc5e52;" @click="jumpMoreCourseList">更多&nbsp;<q-icon name="refresh"/>
                </span>
            </template>

            <template slot-scope="props">
                <div class="col-3"  @click="JumpCourseInfo(props.item.id)">
                    <q-card-media  class="shadow-10"   style="border-radius:10px">
                        <img class="m-img" :src="'/api/upload/' + props.item.imgUrl">
                        <!-- 注意slot="overlay" -->
                        <q-card-title slot="overlay" class="cursor-pointer">
                            <div key="title" >
                                {{props.item.title}}
                            </div>
                        </q-card-title>

                    </q-card-media>
                </div>
            </template>
        </CourseShow>


        <!--优质笔记-->
        <HotNotes :noteList = "hotNoteList">
            <template  slot-scope="props" >
                <div class="col-4">
                    <q-card>
                        <q-card-media>
                            <img :src="'/api/upload' + props.msg.imgUrl">
                        </q-card-media>
                        <q-card-title class="relative-position">
                            <span class="text-secondary"  style="border-left: 2px solid #26A69A; padding-left: 5px;position: absolute; left: 10px; top: 10px; font-size: 14px; ">独特心得</span>
                            <h5 class="text-secondary">{{props.msg.title}}</h5>
                            <!-- 图标在左侧 -->
                            <div slot="right" class="row items-center">
                                <strong>{{props.msg.createBy.username}}</strong>
                            </div>
                        </q-card-title>
                        <q-card-main class=" text-left " style="line-height: 25px;text-indent:23px">
                            <span class="hot-note-text ellipsis-3-lines" >
                                <div v-html="props.msg.content">

                                </div>
                            </span>
                        </q-card-main>
                        <q-card-separator />
                        <q-card-actions align="between">
                            <q-btn flat round dense  />
                            <q-btn flat color="secondary" @click="JumpNoteDetail(props.msg.id)"  label="查看更多" />
                        </q-card-actions>
                    </q-card>
                </div>
            </template>
        </HotNotes>


    </div>

</template>

<script>
    import HotNotes from "@/views/note/HotNotes";
    import CourseShow from "@/views/course/CourseShow";
    import {WOW} from 'wowjs';
    import MCarousel from "@/views/carousel/MCarousel";

    export default {
        name: "Main",
        data(){
          return{
              hotCourseList:[],//最热笔记列表
              newCourseList:[],//最新笔记列表
              btnVisible :true,
              HeadLineList:[],
              hotNoteList:[]
          }
        },
        methods:{
          jumpMoreCourseList(){
              this.$router.push("/courseList")
          },
            JumpCourseInfo(courseId){
                this.$router.push("/courseInfo/" + courseId)
            },
            JumpNoteDetail(noteId){
                this.$router.push("/noteDetail/" + noteId)
            },
          //获取最热的笔记列表
          getHotCourseList(){
              this.$axios({
                  method:'get',
                  url:'/api/course/getHotOrNew/1'
              }).then(response=>{
                  this.hotCourseList = response.data
              })
          },

          //获取最新的课程
          getNewCourseList(){
              this.$axios({
                  method:'get',
                  url:'/api/course/getHotOrNew/0'
              }).then(response=>{
                  this.newCourseList = response.data
              })
          },
            getAllHeadLine(){
                this.$axios({
                    method:'get',
                    url:'/api/headLine/getAllHeadLine'
                }).then(response=>{
                    this.HeadLineList = response.data
                })
            },
            getHotNote(){
                this.$axios({
                    method:'get',
                    url:'/api/note/getHotNote'
                }).then(response=>{
                    this.hotNoteList = response.data
                })
            }
        },
        created(){
            //初始化最热课程
            this.getHotCourseList();
            //初始化最新课程
            this.getNewCourseList();

            this.getAllHeadLine();

            this.getHotNote();

        },
        components:{
            HotNotes,CourseShow,MCarousel
        },
        mounted() {
            new WOW().init();
        }
    }
</script>

<style scoped>

    .main img{
        cursor: pointer;
        transition:all 0.8s;
        height: 190px;
    }

    .main img:hover{
        transform: scale(1.3);

    }
</style>
