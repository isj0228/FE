<template>
  <div class="ProportionChart">
    <h3>추천 투자 비율</h3>
    <div id="chart">
      <apexchart
        type="pie"
        width="380"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "PersonaChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    persona: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      series: [0, 0, 0, 0], // 차트 데이터
      chartOptions: {
        chart: {
          type: "pie",
        },
        width: "20vw",
        labels: ["예/적금", "펀드", "채권", "주식"], // 각 섹션의 레이블
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "40vw",
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.setChartData(); // 컴포넌트가 마운트될 때 차트 데이터 설정
  },
  methods: {
    setChartData() {
      // persona의 투자 비율을 series 배열에 할당
      this.series = [
        this.persona.savingsRate, // 예/적금 비율
        this.persona.fundRate, // 펀드 비율
        this.persona.bondRate, // 채권 비율
        this.persona.stockRate, // 주식 비율
      ];
    },
  },
};
</script>

<style>
.ProportionChart #chart {
  width: 20vw; /* 차트의 크기를 이미지와 맞춤 */
  height: 20vw; /* 차트의 크기를 이미지와 맞춤 */
  max-width: 150px;
  max-height: 150px;
  min-width: 100px;
  min-height: 100px;
}
</style>
