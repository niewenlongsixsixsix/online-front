<template>
    <div class="login">
        <button v-on:click="show = !show">
            Toggle
        </button>
        <transition name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>

<script>
    export default {
        el: '#demo',
        data: {
            show: true
        }
    }
</script>

<style scoped>
    .login{
        background:linear-gradient(to bottom right, #00CCFF , #6666FF);
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .login-content{
        background:#fff;
        border-radius:2px;
        width: 450px;
        height: 350px;
        box-shadow: #eff4fa 10px 0px 0px;
    }

    .c-btn{
        width: 180px;
        transition: width 0.5s;

    }
    .c-btn:hover{
        animation: myfirst 1s;
    }

    @keyframes myfirst
    {
        from{border-radius: 0px}
        to{width: 50px;}
    }
</style>