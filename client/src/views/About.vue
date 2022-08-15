<template> 
<v-app>
    <Dashboard />
    <v-card
   flat
   outlined
   class="rounded-0"
   
  >
    <v-img
      class="white--text align-end"
      height="400px"
      src="../assets/blog4.jpg"
    >
      <v-card-title class="title font-weight-bold black--text text-h2 mb-10">About</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Bliss-Life
    </v-card-subtitle>

    <v-card-text class="text--primary">
     <div>Share your amazing blogs on Bliss-Life</div>
     <div> Bliss-Life is the leading destination to find & showcase creative work ,share and grow.</div>
    </v-card-text>

  </v-card>
</v-app>
</template>
<script>
import Dashboard from './Dashboard.vue'
export default {
    components: {
     Dashboard,
    },
}
</script>