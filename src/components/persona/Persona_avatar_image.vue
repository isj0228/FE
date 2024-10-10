<template>
    <div class="persona-image-wrapper">
      <v-img
        :src="
          persona.imagePath
            ? `http://localhost:8080/api/personas/crossfit_images/${persona.imagePath.split('/').pop()}`
            : '/default_image.jpg'
        "
        class="persona-image"
        @error="onImageError"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'PersonaImage',
    props: {
      persona: {
        type: Object,
        required: true
      }
    },
    methods: {
      onImageError(event) {
        event.target.src = '/default_image.jpg'; // 이미지 로드 실패 시 기본 이미지로 대체
      }
    }
  }
  </script>
  
  <style scoped>
  .persona-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .persona-image {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  </style>
  