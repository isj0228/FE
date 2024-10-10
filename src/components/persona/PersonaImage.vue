<template>
  <div class="persona-image-wrapper">
    <v-img
      :src="
        persona.imagePath
          ? `http://localhost:8080/api/personas/crossfit_images/${persona.imagePath
              .split('/')
              .pop()}`
          : '/default_image.jpg'
      "
      class="persona-image"
      @error="onImageError"
    />
  </div>
</template>

<script>
export default {
  name: "PersonaImage",
  props: {
    persona: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onImageError(event) {
      event.target.src = "/default_image.jpg"; // 이미지 로드 실패 시 기본 이미지로 대체
    },
  },
};
</script>

<style scoped>
.persona-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.persona-image {
  border-radius: 50%;
  width: 100vw; /* 화면 너비의 20%에 맞추어 크기 조절 */
  height: 100vw; /* 화면 너비의 20%에 맞추어 크기 조절 */
  max-width: 200px; /* 최대 크기 설정 */
  max-height: 200px; /* 최대 크기 설정 */
  min-width: 100px; /* 최소 크기 설정 */
  min-height: 100px; /* 최소 크기 설정 */
  object-fit: cover;
  border: 0.05rem solid #7bd5c3;
}
</style>
