<script setup>
import { onMounted, ref } from 'vue'

const showButton = ref(false)

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function checkScroll() {

    if (window.scrollY > 100) {
        showButton.value = true
    } else {
        showButton.value = false
    }
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll)
})
</script>

<template>
    <div>
        <span id="top-link-block" :class="showButton ? 'affix' : 'hidden'">
            <a class="well well-sm" @click="scrollToTop">
                <strong><i class="arrow_carrot-up_alt2"></i> Back to Top</strong>
            </a>
        </span>

    </div>
</template>

<style lang="scss" scoped>
</style>