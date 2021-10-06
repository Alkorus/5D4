<template>
    <div v-if="planet">
        <p>{{planet.name}}</p>
    </div>
    <div v-else>
        <q-spinner-gears color="primary" size="10em"></q-spinner-gears>
    </div>
</template>

<script>
import { api } from 'boot/axios';
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({

    setup() {
        const planet = ref();
        const route = useRoute();

        onMounted(async () => {
            const response = await api.get(route.query.planet)
            if(response.status === 200) {
                setTimeout(() => {
                    planet.value = response.data
                }, 5000)
                
            }
        });

        return {
            planet
        }
    }
});
</script>

<style>

</style>