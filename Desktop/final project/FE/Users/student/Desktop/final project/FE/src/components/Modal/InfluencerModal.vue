<template>
    <v-dialog :value="isOpen" max-width="600px" @close="emitClose">
      <v-card>
        <v-card-title>
          <span class="headline">Influencer Details</span>
        </v-card-title>
        <v-card-text>
          <p>Name: {{ influencer?.personaName }}</p>
          <p>Job: {{ influencer?.job }}</p>
          <img :src="influencer?.image || 'default.jpg'" alt="Influencer Image" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="emitClose" color="primary">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'InfluencerModal',
    props: {
      influencer: {
        type: Object,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      emitClose() {
        this.$emit('update:isOpen', false); // Emit event to close modal
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  