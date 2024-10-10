<template>
  <!-- 상우하자 -->
  <div style="margin: 20px 0px 70px 0px">이달의 추천 영상</div>

  <div id="first" class="d-flex flex-wrap justify-center">
    <!-- 첫번째 -->
    <div id="second1" class="card-wrapper mx-2">
      <v-card
        class="mx-auto"
        color="white"
        max-width="400"
        title="카카오뱅크로 빠르게 1억 모으는 116 플랜"
      >
        <template v-slot:prepend>
          <v-icon class="red-icon">mdi-youtube</v-icon>
        </template>

        <!-- 내용 -->
        <v-card-text
          class="text-h8 py-0"
          style="
            color: black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            max-height: 4em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          "
        >
          4대 대형 시중은행 은행원 출신입니다. * YOUTUBE KOREA OFFICIAL *
          지식공유 크리에이터 선정(2019) 유튜브와 성장한 50인 선정(2021) - 경제
          재테크 분야 1인 - 방송 KBS 슬기로운 어른이생활(2020) 국민영수증(2021)
          MBC 뉴스투데이 SBS 머니테크 - 도서 머니챌린지(2022) - 21세기 북스 -
          ...
        </v-card-text>

        <!-- 유튜버 프로필 이미지 -->
        <v-card-actions class="d-flex">
          <div id="Youtube profile up">
            <v-img
              src="https://yt3.googleusercontent.com/ytc/AIdro_mrAv17zn0TkOP6Msn1IX7Pu6vI_sbxiSPFqs54nnzwahb3=s160-c-k-c0x00ffffff-no-rj"
              width="60"
              padding="10px"
            ></v-img>
          </div>

          <!-- 유튜버 프로필 -->
          <div id="Youtube profile down">
            <v-list-item-content>
              <v-list-item-title style="color: black">댈님</v-list-item-title>
              <v-list-item-subtitle style="color: black"
                >댈님의 생활 속 금융이야기</v-list-item-subtitle
              >
            </v-list-item-content>
          </div>
        </v-card-actions>
      </v-card>
    </div>

    <!-- 두번째 -->
    <div id="second2" class="card-wrapper mx-2">
      <!-- mx-2로 간격 조정 -->
      <v-card
        class="mx-auto"
        color="white"
        max-width="400"
        title="카카오뱅크로 빠르게 1억 모으는 116 플랜"
      >
        <template v-slot:prepend>
          <v-icon class="red-icon">mdi-youtube</v-icon>
        </template>

        <!-- 내용 -->
        <v-card-text
          class="text-h8 py-0"
          style="
            color: black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            max-height: 4em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          "
        >
          4대 대형 시중은행 은행원 출신입니다. * YOUTUBE KOREA OFFICIAL *
          지식공유 크리에이터 선정(2019) 유튜브와 성장한 50인 선정(2021) - 경제
          재테크 분야 1인 - 방송 KBS 슬기로운 어른이생활(2020) 국민영수증(2021)
          MBC 뉴스투데이 SBS 머니테크 - 도서 머니챌린지(2022) - 21세기 북스 -
          ...
        </v-card-text>

        <!-- 유튜버 프로필 이미지 -->
        <v-card-actions class="d-flex">
          <div id="Youtube profile up">
            <v-img
              src="https://yt3.googleusercontent.com/ytc/AIdro_mrAv17zn0TkOP6Msn1IX7Pu6vI_sbxiSPFqs54nnzwahb3=s160-c-k-c0x00ffffff-no-rj"
              width="60"
              padding="10px"
            ></v-img>
          </div>

          <!-- 유튜버 프로필 -->
          <div id="Youtube profile down">
            <v-list-item-content>
              <v-list-item-title style="color: black">댈님</v-list-item-title>
              <v-list-item-subtitle style="color: black"
                >댈님의 생활 속 금융이야기</v-list-item-subtitle
              >
            </v-list-item-content>
          </div>
        </v-card-actions>
      </v-card>
    </div>

    <!-- 세번째 -->
    <div id="second3" class="card-wrapper mx-2">
      <!-- mx-2로 간격 조정 -->
      <v-card
        class="mx-auto"
        color="white"
        max-width="400"
        title="카카오뱅크로 빠르게 1억 모으는 116 플랜"
      >
        <template v-slot:prepend>
          <v-icon class="red-icon">mdi-youtube</v-icon>
        </template>

        <!-- 내용 -->
        <v-card-text
          class="text-h8 py-0"
          style="
            color: black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            max-height: 4em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          "
        >
          4대 대형 시중은행 은행원 출신입니다. * YOUTUBE KOREA OFFICIAL *
          지식공유 크리에이터 선정(2019) 유튜브와 성장한 50인 선정(2021) - 경제
          재테크 분야 1인 - 방송 KBS 슬기로운 어른이생활(2020) 국민영수증(2021)
          MBC 뉴스투데이 SBS 머니테크 - 도서 머니챌린지(2022) - 21세기 북스 -
          ...
        </v-card-text>

        <!-- 유튜버 프로필 이미지 -->
        <v-card-actions class="d-flex">
          <div id="Youtube profile up">
            <v-img
              src="https://yt3.googleusercontent.com/ytc/AIdro_mrAv17zn0TkOP6Msn1IX7Pu6vI_sbxiSPFqs54nnzwahb3=s160-c-k-c0x00ffffff-no-rj"
              width="60"
              padding="10px"
            ></v-img>
          </div>

          <!-- 유튜버 프로필 -->
          <div id="Youtube profile down">
            <v-list-item-content>
              <v-list-item-title style="color: black">댈님</v-list-item-title>
              <v-list-item-subtitle style="color: black"
                >댈님의 생활 속 금융이야기</v-list-item-subtitle
              >
            </v-list-item-content>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.red-icon {
  color: red; /* 유튜브 아이콘 색상 빨강으로 지정 */
}
#first {
  display: flex; /* Flexbox를 사용하여 가로 배열 */
  flex-wrap: wrap; /* 카드가 공간을 초과할 경우 다음 줄로 이동 */
  justify-content: center; /* 카드들을 중앙 정렬 */
}
.card-wrapper {
  margin: 20px 10px; /* 20px 위 아래, 10px 좌 우 */
}
</style>
