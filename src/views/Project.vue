<template>
    <div>
        <v-layout align-center justify-center column fill-height >
            <v-flex my-3 >
                <v-card width="1000" class="pa-4" transition="slide-y-transition">
                    <v-card-title primary-title class="headline">Edit Project</v-card-title>
                    <v-form ref="form" v-model="valid" lazy-validation v-for="n in project" :key="n.id">
                        <v-text-field
                                v-model="preview"
                                :rules="previewRules"
                                label="Preview Image URL"
                                clearable
                                required
                                color="accent"
                                :value="n.src"
                                :change="preview === '' ? updateSrc(n.src) : updateSrc"
                        ></v-text-field>
                        <v-select
                                v-model="position"
                                :items="items"
                                :rules="positionRules"
                                label="Image Position"
                                required
                                color="accent"
                                :item-value="n.position"
                                :change="position === '' ? updatePosition(n.position) : updatePosition"
                        ></v-select>
                        <v-text-field
                                v-model="title"
                                :rules="titleRules"
                                :counter = "30"
                                label="Project Title"
                                clearable
                                required
                                color="accent"
                                :value="n.title"
                                :change="title === '' ? updateTitle(n.title) : updateTitle"
                        ></v-text-field>
                        <v-text-field
                                v-model="desc"
                                :rules="descRules"
                                label="Description"
                                clearable
                                required
                                color="accent"
                                :value="n.desc"
                                :change="desc === '' ? updateDesc(n.desc) : updateDesc"
                        ></v-text-field>
                        <v-text-field
                                v-model="repo"
                                :rules="repoRules"
                                label="Link to GitHub Repository"
                                clearable
                                required
                                color="accent"
                                :value="n.repo"
                                :change="repo === '' ? updateRepo(n.repo) : updateRepo"
                        ></v-text-field>
                        <v-text-field
                                v-model="demo"
                                :rules="demoRules"
                                label="Link to Demo Website"
                                clearable
                                required
                                color="accent"
                                :value="n.demo"
                                :change="demo === '' ? updateDemo(n.demo) : updateDemo"
                        ></v-text-field>
                        <v-btn @click=submit color="accent">update</v-btn>
                        <v-btn @click=confirmClear>clear</v-btn>
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
        data() {

            let valid = true;
            let title = '';
            let preview = '';
            let previewRules = [
                v => !!v || 'Image is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ];
            let position = '';
            let positionRules = [
                v => !!v || 'Position is Required'
            ];
            let titleRules = [
                v => !!v || 'Name is Required'
            ];
            let desc = '';
            let descRules = [
                v => !!v || 'Description is Required'
            ];
            let repo = '';
            let repoRules = [
                v => !!v || 'Repository is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ];
            let demo = '';
            let demoRules = [
                v => !!v || 'Demo is Required',
                v => /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(v) || 'URL must be valid'
            ];
            let items = [
                'center top',
                'center center',
                'center bottom'
            ];
            let project = this.getProject();
            let projectDetails = {};
            return {
                valid,
                title,
                preview,
                previewRules,
                position,
                positionRules,
                titleRules,
                desc,
                descRules,
                repo,
                repoRules,
                demo,
                demoRules,
                items,
                project,
                projectDetails
            }
        },
        methods: {
            getProject() {
                let docs = [];
                // Query database for projects collection
                database.collection('projects').where("id", "==", this.$route.params.id).get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // add each document to the array
                            docs.push(doc.data())
                        });
                    });
                return docs;
            },
            submit() {
                if (this.$refs.form[0].validate()) {
                    let docID = this.$route.params.id;
                    database.collection('projects').doc(docID).set({
                        title: this.title,
                        desc: this.desc,
                        src: this.preview,
                        position: this.position,
                        repo: this.repo,
                        demo: this.demo,
                        id: docID
                    })
                        .then(function() {
                            console.log('Document successfully updated.');
                            alert('Project successfully created.');
                        })
                        .catch(function(error) {
                            console.error('Error adding document: ', error);
                            alert('An error has occurred while attempting to update the database.')
                        });
                    this.clear();
                }
            },
            clear() {
                this.$refs.form[0].reset();
            },
            confirmClear() {
                let response = confirm("Do you want to clear the form?");
                if (response) {
                    this.clear();
                }
            },
            updateSrc(val) {
                this.preview = val;
            },
            updatePosition(val) {
                this.position = val;
            },
            updateTitle(val) {
                this.title = val;
            },
            updateDesc(val) {
                this.desc = val;
            },
            updateRepo(val) {
                this.repo = val;
            },
            updateDemo(val) {
                this.demo = val;
            }
        }
    }
</script>

<style scoped>

</style>