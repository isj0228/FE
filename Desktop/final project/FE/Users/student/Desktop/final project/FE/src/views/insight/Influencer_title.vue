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
            <v-img :src="persona.image || 'default.jpg'" aspect-ratio="1.5" class="image-box"></v-img>
            <v-card-title class="card-title">
              <h3 class="post-name">{{ persona.personaName || "이름 없음" }}</h3>
            </v-card-title>
            <div class="content">
              <p class="post-field">{{ persona.job || "직업 정보 없음" }}</p>
              <!-- job이 null일 때 처리 -->
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
    // State variables
    const personas = ref([]); // 페르소나 데이터를 저장
    const loading = ref(true); // 로딩 상태
    const page = ref(1); // 현재 페이지
    const pageSize = 9; // 페이지 당 아이템 수

    // 데이터 로드 함수
    const loadPersonas = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/personas/get"); // API 호출
        console.log("API Response:", response.data); // API 응답 로그 확인
        personas.value = response.data; // 데이터를 상태에 저장
      } catch (error) {
        console.error("Error loading personas:", error);
      } finally {
        loading.value = false; // 로딩 완료 후 상태 변경
      }
    };

    // 페이지네이션을 위한 계산된 속성
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

    // 컴포넌트가 마운트될 때 데이터 로드
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
    };
  },
};
</script>

<style scoped>
.influencer-list {
  padding: 20px;
}

.title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.influencer-card {
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: center;
  align-items: center;
}

.influencer-card:hover {
  box-shadow: 0 0 20px 10px #77e077;
  cursor: pointer;
}

.image-box {
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
