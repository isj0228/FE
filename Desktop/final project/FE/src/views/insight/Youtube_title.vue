<template>
    <!-- 이달의 추천 영상 섹션 -->
    <div style="margin: 20px 0px 30px 0px; font-size: 1.5rem">이달의 추천 영상</div>

    <!-- 이달의 추천 영상 3개 -->
    <div id="featured-videos" class="d-flex flex-wrap justify-space-between">
        <!-- 첫번째 -->
        <div v-for="i in 3" :key="i" class="card-wrapper">
            <v-card class="mx-auto" color="white" max-width="300" title="추천 영상 제목">
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
                        /* -webkit-line-clamp: 3; */
                        -webkit-box-orient: vertical;
                    "
                >
                    추천 영상 설명입니다. 여기에 추천 영상에 대한 간략한 정보를 넣을 수 있습니다.
                </v-card-text>

                <!-- 유튜버 프로필 이미지 -->
                <v-card-actions class="d-flex">
                    <v-img
                        src="https://yt3.googleusercontent.com/ytc/AIdro_mrAv17zn0TkOP6Msn1IX7Pu6vI_sbxiSPFqs54nnzwahb3=s160-c-k-c0x00ffffff-no-rj"
                        width="60"
                        padding="10px"
                        class="youtube-img"
                    ></v-img>
                    <v-list-item-content>
                        <v-list-item-title style="color: black">유튜버 이름</v-list-item-title>
                        <v-list-item-subtitle style="color: black">
                            유튜버 채널 정보
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-card-actions>
            </v-card>
        </div>
    </div>

    <!-- 다른 영상들 리스트 형식 -->
    <div style="margin: 40px 0px 10px 0px; font-size: 1.5rem">다른 영상들</div>
    <div class="other-videos">
        <v-list>
            <v-list-item v-for="i in 5" :key="i">
                <v-list-item-content>
                    <v-list-item-title>다른 영상 제목 {{ i }}</v-list-item-title>
                    <v-list-item-subtitle>다른 영상 설명입니다.</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<style scoped>
/* 이달의 추천 영상 3개 레이아웃 */
#featured-videos {
    display: flex;
    justify-content: space-between; /* 카드들 간의 공간 균등 배치 */
    margin-bottom: 40px;
}

.card-wrapper {
    width: 30%; /* 각 카드가 3등분된 공간을 차지 */
    margin: 10px;
}

.red-icon {
    color: red; /* 유튜브 아이콘 색상 */
}

.other-videos {
    margin-top: 20px;
}

.v-list-item {
    margin-bottom: 15px; /* 리스트 항목 간 간격 */
}

.youtube-img {
    width: 15vh;
    height: 10vh;
}
</style>
