<template>
  <div>
    <h1>Bond List</h1>
    <ul>
      <li v-for="bond in bondList" :key="bond.productId">
        {{ bond.basDt }} - {{ bond.bondIsurNm }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BondListView',
  computed: {
    // bond 모듈의 getters를 명시적으로 가져오기 위해 'bond/' 네임스페이스 사용
    ...mapGetters('bond', ['getBondList']),
    bondList() {
      return this.getBondList;
    },
  },
  created() {
    // 컴포넌트가 생성될 때 bond 모듈의 fetchBondList 액션 호출
    this.fetchBondList();
  },
  methods: {
    // bond 모듈의 actions을 명시적으로 가져오기 위해 'bond/' 네임스페이스 사용
    ...mapActions('bond', ['fetchBondList']),
  },
};
</script>