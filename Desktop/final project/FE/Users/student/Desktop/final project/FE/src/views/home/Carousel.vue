<template>
    <div class="carousel">
        <!-- Left Arrow -->
        <div class="carousel-arrow left" @click="prevImage">
            &#10094;
            <!-- Unicode left arrow -->
        </div>

        <!-- Images -->
        <div class="carousel-images">
            <img :src="images[currentImage]" alt="Carousel Image" @click="handleImageClick" />
        </div>

        <!-- Right Arrow -->
        <div class="carousel-arrow right" @click="nextImage">
            &#10095;
            <!-- Unicode right arrow -->
        </div>

        <!-- Dots for navigation -->
        <div class="carousel-nav">
            <span
                class="dot"
                v-for="(image, index) in images"
                :key="index"
                :class="{ active: currentImage === index }"
                @click="changeImage(index)"
            >
            </span>
        </div>
    </div>
</template>

<script>
import image1 from '@/assets/img/1first.jpg'; // 포트폴리오
import image2 from '@/assets/img/1second.jpg'; // 투자성향분석
import image3 from '@/assets/img/1third.png'; //

export default {
    data() {
        return {
            currentImage: 0,
            images: [image1, image2, image3],
        };
    },
    methods: {
        handleImageClick() {
            switch (this.currentImage) {
                case 0:
                    this.gotoPage('/my-portfolio'); // 0번째 이미지 클릭 시 '/portfolio'로 이동
                    break;
                case 1:
                    this.gotoPage('/investment-test-start'); // 1번째 이미지 클릭 시 '/investment-test-start'로 이동
                    break;
                case 2:
                    // 2번째 이미지 클릭 시 아무 동작도 하지 않음 (빈 공간으로)
                    break;
                default:
                    break;
            }
        },
        gotoPage(page) {
            this.$router.push(page); // 지정된 페이지로 이동
        },
        changeImage(index) {
            this.currentImage = index;
        },
        nextImage() {
            this.currentImage = (this.currentImage + 1) % this.images.length;
        },
        prevImage() {
            this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
        },
    },
    mounted() {
        // Automatically swap images every 10 seconds
        setInterval(() => {
            this.nextImage();
        }, 10000);
    },
};
</script>

<style scoped>
.carousel {
    position: relative;
    height: 400px; /* Adjust this to make the carousel smaller */
    overflow: hidden;
    margin-bottom: 0px;
    border-radius: 15px; /* 원하는 둥근 정도를 설정 */
}

.carousel-images {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.image-container {
  display: flex;
  transition: transform 0.5s ease-in-out; /* Smooth slide effect */
  height: 100%;
}

.carousel-images img {

    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-arrow {
    position: absolute;
    top: 0; /* 위쪽에 고정 */
    bottom: 0; /* 아래쪽에 고정 */
    width: 300px; /* 필요에 따라 너비를 조정 */
    font-size: 30px;
    color: transparent;
    cursor: pointer;
    padding: 10px;
    display: flex;
    align-items: center; /* 수직으로 중앙 정렬 */
    justify-content: center; /* 수평으로 중앙 정렬 */
    user-select: none;
}

.carousel-arrow.left {
    left: 0; /* 왼쪽에 고정 */
}

.carousel-arrow.right {
    right: 0; /* 오른쪽에 고정 */
}

.carousel-nav {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: #ddd;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
}

.dot.active {
    background-color: #007bff;
}

.carousel:hover {
    cursor: pointer;
}
</style>
