<template>
    <nav>
        <v-toolbar app dark v-if="this.$route.name !== 'Home'">
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <span class="">{{ this.$route.name }}</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" app class="white lighten--4">
            <v-list>
                <v-list-tile @click="drawer = !drawer" v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="secondary--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        data() {
            return {
                drawer: false,
                links: [
                    { icon: 'home', text: 'Home', route: '/' },
                    { icon: 'code', text: 'Projects', route: '/projects' },
                    { icon: 'info', text: 'About', route: '/about'}
                ]
            }
        }
    }
</script>

<style scoped>

</style>