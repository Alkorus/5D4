<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"/>

        <div class="q-px-lg q-pt-xl q-mb-md">
          <div class="text-h3">{{$t('tasks', 'fr-CA')}}</div>  
          <div class="text-subtitle1">{{ todayDate }}</div>
        </div> 

        <q-img
          src="~/assets/forest.jpg"
          class="header-image absolute-top" />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="200"
      :breakpoint="600">

      <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item
            to="/"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="list"/>
            </q-item-section>
            <q-item-section>
              Tâches
            </q-item-section>
          </q-item>
          <q-item
            to="/planets"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="travel_explore"/>
            </q-item-section>
            <q-item-section>
              Planètes
            </q-item-section>
          </q-item>
          <q-item
            to="/help"
            exact
            clickable
            v-ripple>
            <q-item-section avatar>
              <q-icon name="help"/>
            </q-item-section>
            <q-item-section>
              Aide
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="~/assets/forest.jpg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const todayDate = computed(() => date.formatDate(Date.now(),'YYYY-MM-DD'))

    return {
      leftDrawerOpen,
      todayDate,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style lang="scss">
  .header-image {
    height: 100%;
    z-index: -1;
    filter: grayscale(100%);
    opacity: 0.25;
  }
  
</style>
