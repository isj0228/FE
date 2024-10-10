<template>
  <div class="influencer-list">
    <!-- 로딩 중 상태 표시 -->
    <v-container v-if="loading">
      <v-row>
        <p>Loading personas...</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터가 없을 때 표시 -->
    <v-container v-else-if="personas.length === 0">
      <v-row>
        <p>No personas available.</p>
      </v-row>
    </v-container>

    <!-- 페르소나 데이터를 정상적으로 로드했을 때 -->
    <v-container v-else>
      <v-row>
        <v-col v-for="persona in paginatedPersonas" :key="persona.personaId" cols="12" md="4">
          <v-card class="influencer-card my-3">
            <!-- 이미지 경로가 있으면 이미지 표시, 없으면 기본 이미지 표시 -->
            <v-img
              :src="
                persona.imagePath
                  ? `http://localhost:8080/api/personas/crossfit_images/${persona.imagePath.split('/').pop()}`
                  : '/default_image.jpg'
              "
              class="image-box"
              style="width: 150px; height: 150px"
              @error="onImageError"
            />
            <v-card-title class="card-title">
              <h3 class="post-name">{{ persona.personaName || "이름 없음" }}</h3>
            </v-card-title>
            <div class="content">
              <p class="post-field">{{ persona.job || "직업 정보 없음" }}</p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- 페이지네이션 -->
    <div id="Pagination">
      <v-container>
        <v-pagination v-model="page" :length="totalPages" @input="onPageChange"></v-pagination>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";

export default {
  name: "InfluencerList",
  setup() {
    const personas = ref([]);
    const loading = ref(true);
    const page = ref(1);
    const pageSize = 6;

    const loadPersonas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/personas/get");
        personas.value = response.data;
      } catch (error) {
        console.error("Error loading personas:", error);
      } finally {
        loading.value = false;
      }
    };

    const paginatedPersonas = computed(() => {
      const start = (page.value - 1) * pageSize;
      const end = start + pageSize;
      return personas.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(personas.value.length / pageSize);
    });

    const onPageChange = (newPage) => {
      page.value = newPage;
    };

    const onImageError = (event) => {
      event.target.src = "/default_image.jpg"; // 이미지 로드 실패 시 기본 이미지로 대체
    };

    onMounted(() => {
      loadPersonas();
    });

    return {
      personas,
      paginatedPersonas,
      totalPages,
      page,
      onPageChange,
      loading,
      onImageError,
    };
  },
};
</script>

<style scoped>
.influencer-list {
  padding: 20px;
}

.influencer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.3s ease-in-out;
}

.influencer-card:hover {
  box-shadow: 0 0 20px 10px #77e077;
  cursor: pointer;
}

.image-box {
  object-fit: cover;
  width: 150px;
  height: 150px;
}

.card-title {
  text-align: center;
}

.content {
  text-align: center;
  padding: 10px;
}

.post-name {
  font-size: 1.2em;
  margin: 0;
}

.post-field {
  font-size: 0.9em;
  color: #000000;
  margin: 5px 0;
}
</style>
