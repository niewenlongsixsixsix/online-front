<template>
    <div class="row justify-center myCourse animated fadeIn" style="padding-top: 30px; padding-bottom: 50px">
        <div class="col-10">
            <q-list>
                <q-list-header>我的课程</q-list-header>
                <q-item v-for="item in loveCourseList">
                    <q-item-side :image="'/api/upload/' + item.imgUrl" />
                    <q-item-main :label="item.title" />
                    <q-item-side right>
                        <q-btn  color="warning" size="small" @click="JumpCourseInfo(item.id)" outline label="观看" />
                    </q-item-side>
                </q-item>
                <q-item-separator />
            </q-list>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCourse",
        data(){
            return{
                page4: 1,
                loveCourseList:[]
            }
        },
        methods:{
            JumpCourseInfo(courseId){
                this.$router.push("/courseInfo/" + courseId)
            },
            getAllLoveCourse(){
                this.$axios({
                    method:'get',
                    url:'/api/loveCourse/getUserAllLoveCourse'
                }).then(response=>{
                    if(response.data.success){
                        this.loveCourseList = response.data.loveCourseList
                    }
                })
            }
        },
        created(){
            this.getAllLoveCourse();
        }
    }
</script>

<style>

    .myCourse .q-btn{
        font-size: 16px;
    }
</style>
