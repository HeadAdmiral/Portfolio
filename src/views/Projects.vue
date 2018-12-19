<template>
  <div class="projects">
    <div v-konami:opts.custom="easterEgg"></div>
    <v-layout align-center justify-center column fill-height>
      <div v-for="project in projects" :key="project.repo">
        <div class="card" :id="project.id">
          <v-flex my-3  v-show="empty === false">
            <v-card width="1000" hover>
              <v-img :src="project.src" aspect-ratio="2.75" :position=project.position></v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ project.title }}</h3>
                  <span>{{ project.desc }}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat @click=setURL(project.repo) v-if="konami.allow === false">GitHub</v-btn>
                <v-btn flat @click=setURL(project.demo) color="accent" v-if="konami.allow === false">Explore</v-btn>
                <v-btn flat router :to="{ path: 'project/' + project.id }" v-if="konami.allow === true">Edit</v-btn>
                <v-btn flat @click="deleteProject(project.title, project.id)" color="accent" v-if="konami.allow === true">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </div>
      </div>
      <v-btn fixed fab right bottom class="mx-5 my-4 accent" v-if="konami.allow === true" router :to="konami.route" transition="fade-transition">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row align-content-end justify-center ma-5 pa-5 v-show="empty === true">
      <div class="text-xs-center">
        <v-avatar justify-center align-content-end size="350" class="mb-5">
          <v-img src="https://i.imgur.com/RxOYpN3.png"></v-img>
        </v-avatar>
        <h3 class="headline mb-0 grey--text text--darken-2">There doesn't seem to be anything here...</h3>
      </div>
    </v-layout>
  </div>
</template>

<script>
  import database from '@/components/firebaseInit.js'
  export default {
      data() {
          let projects =  this.getProjects();
          let empty = this.isEmpty();
          return {
              projects,
              empty,
              opts: {
                  timeout: 3000, // controls how long (in ms) you have to enter the chain correctly
                  chain: '38-38-40-40-37-39-37-39-66-65' // up-up-down-down-left-right-left-right-b-a
              },
              edit: {
                  route: '/project/'
              },
              konami: {
                  allow: false,
                  route: '/newproject'
              }
          }
      },
      methods: {
          setURL: function(URL) {
              // Open URL in a new tab
              window.open(URL, '_blank');
          },
          easterEgg: function() {
              // Allow editing by modifying konami.allow
              this.konami.allow = true;
          },
          getProjects: function() {
              let docs = [];
              // Query database for projects collection
              database.collection('projects').orderBy("id", "desc").get()
                  .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // Update the stored ID to match the document's ID
                        docs.push(doc.data())
                    });
                  });
              return docs;
          },
          deleteProject: function(project, id) {
              // Show confirm dialog, and delete project if user select's 'OK'
              let confirmDelete = confirm("Do you want to delete " + project + "?");
              if (confirmDelete) {
                  // Get element in DOM
                  let card = document.getElementById(id);
                  // Remove element from DOM
                  this.remove(card);

                  // Remove element from database
                  database.collection('projects').doc(id).delete().then(function () {
                      console.log("Document successfully deleted!");
                  }).catch(function (error) {
                      console.error("Error removing document: ", error);
                  });
              }
              this.empty = this.isEmpty();
          },
          remove: function(element) {
              // Removes element from DOM
              element.parentNode.removeChild(element);
          },
          isEmpty: function() {
              // Returns true if there are no elements with a class value of 'card' on the page
              // ie. If there are no projects, returns true. Else false.
              if (document.getElementsByClassName("card").length === 0) {
                  return true;
              }
              else if (document.getElementsByClassName("card").length > 0){
                  return false;
              }

          }

      },
      updated() {
          // Checks if projects are on the page each time the page is updated.
          this.empty = this.isEmpty()
      }
  }
</script>
