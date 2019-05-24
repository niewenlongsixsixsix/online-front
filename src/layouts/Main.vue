<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <div class="main">

        <!--轮播图组件-->
        <MCarousel></MCarousel>

        <!--最热课程组件-->
        <CourseShow style="background: rgb(243,243,243);" v-bind:imgList="hotCourseList" >
            <!--左侧标题-->
            <template v-slot:courseTitle>
                <span style="padding:2px; font-size: 20px; height: 80px; line-height: 80px; border-bottom: 2px chocolate solid; color: #4d555d; font-weight: bold;">
                热门课程
                </span>
            </template>
            <!--右下角刷新方式-->
            <template v-slot:changeText>
                <span style="color: #cc5e52;">
                换一批&nbsp;<q-icon name="refresh"/>
                </span>
            </template>

            <template slot-scope="props">
                <div class="col-3" @click="alertImgTitle(props.item.title)">
                    <q-card-media  class="shadow-10"   style="border-radius:10px">
                        <img class="m-img" :src="props.item.imgUrl">
                        <!-- 注意slot="overlay" -->
                        <q-card-title slot="overlay" class="cursor-pointer">
                            <div key="title" >
                                {{props.item.title}}
                                <div>
                                    <q-icon name="visibility">
                                    </q-icon>
                                    &nbsp;{{props.item.view}}
                                </div>
                            </div>
                        </q-card-title>

                    </q-card-media>
                </div>
            </template>
        </CourseShow>


        <!--最新课程组件-->
        <CourseShow class=" wow slideInUp " style="background: rgb(255,255,255); visibility: visible;" v-bind:imgList="newCourseList">
            <!--左侧标题-->
            <template v-slot:courseTitle>
                <span style="padding:2px; font-size: 20px; height: 80px; line-height: 80px; border-bottom: 2px #8d84cc solid; color: #4d555d; font-weight: bold;">
                最新课程
                </span>
            </template>
            <!--右下角刷新方式-->
            <template v-slot:changeText>
                <span style="color: #8d84cc;">
                换一批&nbsp;<q-icon name="refresh"/>
                </span>
            </template>

            <template slot-scope="props">
                <div class="col-3" @click="alertImgTitle(props.item.title)">
                    <q-card-media  class="shadow-10"   style="border-radius:10px">
                        <img class="m-img" :src="props.item.imgUrl">
                        <!-- 注意slot="overlay" -->
                        <q-card-title slot="overlay" class="cursor-pointer">
                            <div key="title" >
                                {{props.item.title}}
                                <div>
                                    <q-icon name="visibility">
                                    </q-icon>
                                    &nbsp;{{props.item.view}}
                                </div>
                            </div>
                        </q-card-title>

                    </q-card-media>
                </div>
            </template>
        </CourseShow>

        <!--优质笔记-->
        <HotNotes> </HotNotes>


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
          }
        },
        methods:{
          alertImgTitle(title){
              alert(title);
          },

          //获取最热的笔记列表
          getHotCourseList(){
              this.$axios({
                  method:'get',
                  url:'https://www.easy-mock.com/mock/5ca888dd4f62671c250622bb/course/hotCourseList'
              }).then(response=>{
                  this.hotCourseList = response.data.hotCourseList
              })
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
        created(){
            //初始化最热课程
            this.getHotCourseList();
            //初始化最新课程
            this.getNewCourseList();

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
