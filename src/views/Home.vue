<template>
    <div class="home">
        <v-content class="ma-5 pa-5" style="position:absolute; top: 20%; left: 27.5%;">
            <v-container>
                <v-layout row align-content-end justify-center>
                    <v-flex xs12 md4>
                        <div class="text-xs-center">
                            <v-avatar size="125px">
                                <v-img class="img-circle elevation-7 mb-2" contain src="https://i.imgur.com/sSNztKu.png"></v-img>
                            </v-avatar>
                            <h5 class="subheading">Alex Mastin</h5>
                            <div class="body-2 text-xs-center grey--text pt-1 pb-3">Software Developer</div>
                            <v-layout justify-space-around>
                                <v-btn flat color="accent">Home</v-btn>
                                <v-btn flat color="accent" @click="setURL('https://wordpress.com/')">Blog</v-btn>
                                <v-btn flat color="accent" router :to="'/projects'">Projects</v-btn>
                                <v-btn flat color="accent" router :to="'/about'">About</v-btn>
                            </v-layout>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "Home",
        methods: {
            setURL: function(URL) {
                window.open(URL, '_blank');
            }
        }
    }
</script>

<style scoped>

</style>