<template>
    <transition
            appear
            enter-active-class="animated fadeIn"
    >
    <router-view/>
    </transition>
</template>

<script>
    export default {
        name: "TeacherManagerCenter"
    }
</script>

<style scoped>
</style>
