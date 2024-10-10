<template>
    <v-dialog v-model="isOpen" @close="$emit('close')">
      <v-card>
        <v-card-title>
          {{ influencer.personaName }}
        </v-card-title>
        <v-card-text>
          <p>{{ influencer.details || 'No additional details available.' }}</p>
          <p>Job: {{ influencer.job || '직업 정보 없음' }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="$emit('close')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'InfluencerDesc',
    props: {
      influencer: {
        type: Object,
        required: true,
      },
    },
    computed: {
      isOpen() {
        return this.influencer !== null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for your modal if needed */
  </style>
  