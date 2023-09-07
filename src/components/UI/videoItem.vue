<script setup>
const props = defineProps({
    video: Object
})
</script>


<template>

    <button class="btn" onclick="my_modal_3.showModal()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
            <path fill-rule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clip-rule="evenodd" />
        </svg>
    </button>
    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <iframe class="w-full h-96 p-5" :id="video.id" :src="`https://www.youtube.com/embed/${video[0]?.key}`" frameborder="0">

            </iframe>
        </div>
    </dialog>
</template>
