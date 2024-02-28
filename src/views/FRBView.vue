<template>
    <div>
        <v-container>
        <v-row align="center" justify="center">
          <v-col
            v-for="(variant, i) in variants"
            :key="i"
            cols="12"
            md="3"
          >
            <v-card
              class="mx-auto"
              max-width="344"
              :variant="variant"
            >
              <v-card-item>
                <div>
                  <div class="text-overline mb-1">
                    {{ variant }}
                  </div>
                  <div class="text-h6 mb-1">
                    Headline
                  </div>
                  <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
                </div>
              </v-card-item>

              <v-card-actions>
                <v-btn>
                  Button
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

       <v-btn icon="mdi-calendar" size="x-large"></v-btn>
         <v-chip variant="flat" color="green">
          Green flat
        </v-chip>
    </div>
</template>

<script>

export default {
    name: 'FRBView',
    data(){
        return{
            variants : ['elevated', 'flat', 'tonal', 'outlined'],
        }
    }
}
</script>

<style>
</style>