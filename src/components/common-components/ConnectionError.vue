<template>
    <div class="container">
        <img class="main-img center" src="../../assets/wifi-router.png" alt="Connection Error">
        <p class="text-center main-error">No Internet Connection</p>
        <p class="text-center error-des">Check your internet connection and try again. But you can order.</p>
        <button class="btn btn-orange reload-btn center" @click="reload">Order Now</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ConnectionError',
    methods: {
        reload: function () {
            this.$router.push({name: 'Order'});
        }
    }
})
</script>

<style scoped>
.container {
    height: 70vh;
    padding: 0% 20%;
}
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 25%;
}
.main-img {
    max-width: 100%;
    height: auto;
}
.main-error {
    margin-top: 10%;
    font-size: 35px;
    font-weight: 700;
}
.error-des {
    margin-top: 10px;
    font-weight: 600;
}
.reload-btn {
    margin-top: 10%;
}
</style>