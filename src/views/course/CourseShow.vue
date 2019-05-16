<template>
    <div class="row justify-center courseShow  hot-course" style="margin-top: 10px; padding-top:20px;padding-bottom: 30px" >
        <div class="col-10">
            <slot name="courseTitle"></slot>
            <div class="row justify-start gutter-md text-center">
                <slot v-for="item in imgList" :item="item">

                </slot>
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

</style>
