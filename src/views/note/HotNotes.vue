<template>
    <div class="row justify-center  hot-note" style="padding-top:50px;padding-bottom: 100px;background: rgb(245,245,245);" >
        <div class="col-10">
            <span style="padding:2px; font-size: 20px; height: 60px; line-height: 60px; font-family: PingFang SC; color: #4d555d; font-weight: bold; border-bottom:#26A69A 2px solid">优质笔记</span>
            <div class="row justify-start  gutter-md" style="text-align: center;">

                <slot v-for="(i,index) in noteList " :msg="i">

                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotNotes",
        props:{
            noteList:Array
        },
        data(){
            return{
                start:''
            }
        }
    }
</script>


<style scoped>

    .hot-note-text{
        font-size: 12px;
        color: #4d555d;
        line-height: 24px;
        text-align: justify;
        word-break: break-all;
        font-weight: 400;
    }
    .hot-note img{
        height: 220px;
    }
</style>
