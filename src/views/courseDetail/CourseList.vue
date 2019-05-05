<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
        <div class="row justify-center " style="margin-top: 40px;">
            <div class="col-10 shadow-5" style="padding: 20px; border-radius: 10px">
                    <dl>
                        <dt>
                            <span>按分类</span>
                        </dt>
                        <dd>
                            <ul class="categoryUl">
                                <li><a class="aActive"  href="#">全部</a></li>
                                <li v-for="item in 18"><a href="#">离散数学 + {{item}}</a></li>
                            </ul>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <span>按时常</span>
                        </dt>
                        <dd>
                            <ul class="categoryUl">
                                <li><a class="aActive"  href="#">全部</a></li>
                                <li ><a href="#">离散数学</a></li>
                                <li><a  href="#">离散数学</a></li>
                                <li><a href="#">离散数学</a></li>
                                <li><a href="#">离散数学</a></li>
                                <li><a href="#">离散数学</a></li>
                            </ul>
                        </dd>
                    </dl>
            </div>


            <CourseShow class=" wow slideInUp " style="background: rgb(255,255,255);" v-bind:imgList="hotCourseList">
                <template v-slot:courseTitle>
            <span style="padding:2px; font-size: 20px; height: 80px; line-height: 80px; border-bottom: 2px #8d84cc solid; color: #4d555d; font-weight: bold;">
              课程
            </span>
                </template>
            </CourseShow>

            <q-page style="min-height: 0px; margin-bottom: 100px">
                <q-pagination
                        v-model="page4"
                        color="warning"
                        :min="7"
                        :max="18"
                        :max-pages="8"
                        boundary-links
                        direction-links
                />
            </q-page>
        </div>


</template>

<script>
    import QCard from "quasar-framework/src/components/card/QCard";
    import CourseShow from "@/views/CourseShow";
    import ChapterList from "@/views/courseDetail/ChapterList";
    export default {
        name: "CourseList",
        components: {QCard,CourseShow},
        data(){
            return{
                hotCourseList:[],
                page4: 9
            }
        },
        created(){
            this.$axios({
                method:'get',
                url:'https://www.easy-mock.com/mock/5ca888dd4f62671c250622bb/course/hotCourseList'
            }).then(response=>{
                this.hotCourseList = response.data.hotCourseList
            })
        }
    }
</script>

<style scoped>
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
    }

    .categoryUl li a:hover{
        color: #fff;
        background: #ff662f;
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