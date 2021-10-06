<template>
    <div class="q-pa-md row q-gutter-md justify-center">
        <q-card bordered class="col-2"
            v-for="planet in planets" 
            :key="planet.href">
            <router-link :to="{name:'detailPlanet', query:{planet: planet.href}}">
                <q-card-section>
                    <q-img :src="planet.icon" spinner-color="blue"/>
                    <h6>{{planet.name}}</h6>
                </q-card-section>
            </router-link>
        </q-card>

    </div>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, ref, onMounted } from 'vue';

const BASE_URL = 'https://api.andromia.science';

export default defineComponent({
    setup() {
        const planets = ref([]);

        onMounted(async () => {
            const response = await api.get(`${BASE_URL}/planets`);
            console.log(response);
            if(response.status === 200) {
                planets.value = response.data;
            }
        });

        return {
            planets
        }
    }
})
</script>

<style>

</style>