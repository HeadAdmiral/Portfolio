<template>
    <div>
        <v-layout align-center justify-center column fill-height >
            <v-flex my-3>
                <v-card width="1000" class="pa-4" transition="slide-y-transition">
                    <v-card-title primary-title class="headline">New Project</v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field
                                v-model="preview"
                                :rules="previewRules"
                                label="Preview Image URL"
                                clearable
                                required
                                color="accent"
                        ></v-text-field>
                        <v-select
                                v-model="position"
                                :items="items"
                                :rules="positionRules"
                                label="Image Position"
                                required
                                color="accent"
                        ></v-select>
                        <v-text-field
                                v-model="title"
                                :rules="titleRules"
                                :counter = "30"
                                label="Project Title"
                                clearable
                                required
                                color="accent"
                        ></v-text-field>
                        <v-text-field
                                v-model="desc"
                                :rules="descRules"
                                label="Description"
                                clearable
                                required
                                color="accent"
                        ></v-text-field>
                        <v-text-field
                                v-model="repo"
                                :rules="repoRules"
                                label="Link to GitHub Repository"
                                clearable
                                required
                                color="accent"
                        ></v-text-field>
                        <v-text-field
                                v-model="demo"
                                :rules="demoRules"
                                label="Link to Demo Website"
                                clearable
                                required
                                color="accent"
                        ></v-text-field>
                        <v-btn @click=submit color="accent">submit</v-btn>
                        <v-btn @click=clear>clear</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    import database from '@/components/firebaseInit.js'
    export default {
        name: "NewProject",
        data: () => ({
            valid: true,
            title: '',
            preview: '',
            previewRules: [
                v => !!v || 'Image is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ],
            position: '',
            positionRules: [
                v => !!v || 'Position is Required'
            ],
            titleRules: [
                v => !!v || 'Name is Required'
            ],
            desc: '',
            descRules: [
                v => !!v || 'Description is Required'
            ],
            repo: '',
            repoRules: [
                v => !!v || 'Repository is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ],
            demo: '',
            demoRules: [
                v => !!v || 'Demo is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ],
            items: [
                'center top',
                'center center',
                'center bottom'
            ]
        }),
        methods: {
            submit: function() {
                if (this.$refs.form.validate()) {
                    database.collection('projects').add({
                        title: this.title,
                        desc: this.desc,
                        src: this.preview,
                        repo: this.repo,
                        demo: this.demo
                    })
                        .then(function(docRef) {
                            console.log('Document written with ID: ', docRef.id);
                        })
                        .catch(function(error) {
                            console.error('Error adding document: ', error);
                            alert('An error has occurred while attempting to save to the database.')
                        });
                    this.clear();
                }
            },
            clear: function() {
                this.$refs.form.reset();
            }
        }
    }
</script>

<style scoped>

</style>