<template>
    <div class="row justify-center courseShow  hot-course" style="margin-top: 10px; padding-top:20px;padding-bottom: 30px" >
        <div class="col-10">
            <slot name="courseTitle"></slot>
            <div class="row justify-start gutter-md text-center">

                <div class="col-3" v-for="(item,index) in imgList" :key="index"  >
                    <q-card-media  class="shadow-10"   style="border-radius:10px">
                        <img class="m-img" :src="item.imgUrl">
                        <!-- 注意slot="overlay" -->
                            <q-card-title slot="overlay" class="cursor-pointer">
                                    <div key="title" >
                                        {{item.title}}
                                        <div>
                                            <q-icon name="visibility">
                                            </q-icon>
                                            &nbsp;{{item.view}}
                                        </div>
                                    </div>
                            </q-card-title>

                    </q-card-media>
                </div>
            </div>
            <span class="text-weight-bold" style="float: right; margin-top: 20px;  cursor: pointer;"><slot name="changeText"></slot> </span>
        </div>
    </div>
</template>

<script>
    import QIcon from "quasar-framework/src/components/icon/QIcon";
    export default {
        components: {QIcon},
        props: ['imgList'],
        name: "CourseShow",
        data(){
            return{
                overVisible:false
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

    .courseShow img{
        cursor: pointer;
        transition:all 0.8s;
        height: 210px;
    }

    .courseShow img:hover{
        transform: scale(1.3);

    }
</style>