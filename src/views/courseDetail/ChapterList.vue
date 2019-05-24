<template>
    <div>
        <slot v-for="(i,index) in smallChapters " :msg="i">

        </slot>
    </div>
</template>

<script>
    export default {
        name: "ChapterList",
        props:{
            smallChapters:Array
        },
    }
</script>

<style scoped>

</style>
