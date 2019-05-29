<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <div class="courseList row justify-center " style="margin-top: 40px;">
            <div class="col-10 shadow-5" style="padding: 20px; border-radius: 10px">
                    <dl>
                        <dt>
                            <span>按分类</span>
                        </dt>
                        <dd>
                            <ul class="categoryUl">
                                <li v-for="(item,index) in categoryList" :key="index"  class="cursor-pointer" @click="activedLi(item.id)">
                                    <a :class="{aActive: item.id == activeId}"> {{item.name}}</a>
                                </li>
                            </ul>
                        </dd>
                    </dl>
            </div>

            <!--最热课程组件-->
            <CourseShow style="background: rgb(243,243,243);" v-bind:imgList="hotCourseList" >
                <template slot-scope="props">
                    <div class="col-3" @click="JumpCourseInfo(props.item.id)">
                        <q-card-media  class="shadow-10"   style="border-radius:10px">
                            <img class="m-img" :src="'/api/upload' + props.item.imgUrl">
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
        </div>


</template>

<script>
    import QCard from "quasar-framework/src/components/card/QCard";
    import CourseShow from "@/views/course/CourseShow";
    import ChapterList from "@/views/courseDetail/ChapterList";
    import QSpinnerGears from "quasar-framework/src/components/spinner/QSpinnerGears";
    import QSpinnerAudio from "quasar-framework/src/components/spinner/QSpinnerAudio";
    export default {
        name: "CourseList",
        components: {QCard,CourseShow},
        data(){
            return{
                hotCourseList:[],
                page4: 9,
                categoryList: [],
                activeId: 12410
            }
        },
        methods:{
            JumpCourseInfo(courseId){
                this.$router.push("/courseInfo/" + courseId)
            },
            activedLi(val){
                this.activeId = val;
                this.getAllCategoryByCategoryId();
            },
            getAllCategory(){
                this.$axios({
                    method:'get',
                    url:'/api/classification/getAllClassification'
                }).then(response=>{
                    this.categoryList = response.data
                })
            },
            getAllCategoryByCategoryId(){
                this.$q.loading.show({
                    spinner: QSpinnerAudio,
                    message: '数据加载中',
                    spinnerSize: 250, // 像素
                    spinnerColor: 'white',
                })

                this.$axios({
                    method:'get',
                    url:'/api/course/getCourseByClassification/' + this.activeId
                }).then(response=>{
                    setTimeout(()=>{
                        this.hotCourseList = response.data;
                        this.$q.loading.hide();
                    },500)

                })
            }
        },

        created(){
            this.getAllCategory();
            this.getAllCategoryByCategoryId();
        }
    }
</script>

<style scoped>

    .courseList img{
        cursor: pointer;
        transition:all 0.8s;
        height: 180px;
    }

    .courseList img:hover{
        transform: scale(1.3);

    }
    .categoryUl li{
        float:left;
        margin-right: 10px;
        list-style-type: none;
    }
    .categoryUl li a{
        display: block;
        color: #666;
        font-size: 14px;
        padding: 0 20px;
        line-height: 30px;
        border-radius: 4px;
        margin: 5px 0;
        outline: 0;
        vertical-align: baseline;
        background: transparent;
        text-decoration:none;
        transition: color .6s,background-color .6s;
    }

    .categoryUl li a:hover{
        color: #fff;
        background-color: #ff662f;
    }

    dl {
        display: block;
        clear:both;
    }

    dt{
        font-size: 20px;
        padding: 5px;
    }
    dd{
        margin-left: 30px;
    }

    .aActive{
        color: #fff !important; ;
        background: #ff662f !important;
    }
</style>
