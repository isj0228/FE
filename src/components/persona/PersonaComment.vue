<template>
  <div class="persona-comments">
    <p>{{ persona.comments }}</p>
  </div>
</template>

<script>
export default {
  name: "PersonaComment",
  props: {
    persona: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
.persona-comments {
  font-size: 1em; /* 글자 크기 조절 */
  color: #333; /* 글자 색상 */
  margin: 10px 0; /* 상하 여백 */
}

p {
  font-family: "Nanum Gothic", sans-serif;
  font-style: oblique;
  font-weight: bold;
}
</style>
