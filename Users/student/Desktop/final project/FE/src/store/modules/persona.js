import { fetchPersonas } from "@/api/personaApi";

const personaModule = {
  namespaced: true,
  state: () => ({
    personas: [], // 페르소나 데이터를 저장할 배열
    loaded: false, // 데이터 로드 여부
  }),

  mutations: {
    setPersonas(state, personas) {
      state.personas = personas; // 데이터를 상태에 저장
      state.loaded = true; // 데이터 로드 완료
    },
    setLoading(state, isLoading) {
      state.loaded = isLoading;
    },
  },

  actions: {
    async loadPersonas({ commit }) {
      commit("setLoading", false); // 로딩 시작
      try {
        const personas = await fetchPersonas(); // API로부터 데이터 가져옴
        commit("setPersonas", personas); // 상태에 데이터 저장
      } catch (error) {
        console.error("Error loading personas:", error);
      } finally {
        commit("setLoading", true); // 로딩 종료
      }
    },
  },

  getters: {
    getPersonas(state) {
      return state.personas; // 페르소나 데이터를 반환
    },
    isLoaded(state) {
      return state.loaded; // 로드 완료 여부 반환
    },
  },
};

export default personaModule;
