<script>
export default {
  data() {
    return {
      dialog: false,
      page: 2,
      cars: [
        {
          name: 'Ford Mustang',
          horsepower: 450,
          fuel: 'Gasoline',
          origin: 'USA',
          price: 55000,
        },
        {
          name: 'Tesla Model S',
          horsepower: 670,
          fuel: 'Electric',
          origin: 'USA',
          price: 79999,
        },
        {
          name: 'BMW M3',
          horsepower: 503,
          fuel: 'Gasoline',
          origin: 'Germany',
          price: 70000,
        },
        {
          name: 'Audi RS6',
          horsepower: 591,
          fuel: 'Gasoline',
          origin: 'Germany',
          price: 109000,
        },
        {
          name: 'Chevrolet Camaro',
          horsepower: 650,
          fuel: 'Gasoline',
          origin: 'USA',
          price: 62000,
        },
        {
          name: 'Porsche 911',
          horsepower: 379,
          fuel: 'Gasoline',
          origin: 'Germany',
          price: 101000,
        },
        {
          name: 'Jaguar F-Type',
          horsepower: 575,
          fuel: 'Gasoline',
          origin: 'UK',
          price: 61000,
        },
        {
          name: 'Mazda MX-5',
          horsepower: 181,
          fuel: 'Gasoline',
          origin: 'Japan',
          price: 26000,
        },
        {
          name: 'Nissan GT-R',
          horsepower: 565,
          fuel: 'Gasoline',
          origin: 'Japan',
          price: 113540,
        },
        {
          name: 'Mercedes-AMG GT',
          horsepower: 523,
          fuel: 'Gasoline',
          origin: 'Germany',
          price: 115900,
        },
      ]
    };
  },
  methods: {
    async applyF() {
      this.dialog = false
    },
    afterHandler() {
      console.log('fetch')
    },
    pagingHandler(p) {
      console.log(p);
      console.log(this.page);
    }
  }
}
</script>
<template>
  <div class="text-center pa-4">
    <v-btn @click="dialog = true">
      Open Dialog
    </v-btn>

    <v-dialog v-model="dialog" width="auto" @afterEnter="afterHandler">
      <v-card max-width="400" prepend-icon="mdi-update"
        text="Your application will relaunch automatically after the update is complete." title="Update in progress">
        <v-card-text>
          username <input class="form-control"><br>
          username <input class="form-control"><br>
          username <input class="form-control"><br>
          username <input class="form-control"><br>
        </v-card-text>
        <template v-slot:actions>
          <button class="btn btn-success" @click="applyF()">등록</button>
          <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-data-table :items="cars"></v-data-table>
    <v-pagination :length="20" v-model="page" rounded="circle" @update:modelValue="pagingHandler"
      :total-visible="7"></v-pagination>
  </div>
</template>
<style></style>