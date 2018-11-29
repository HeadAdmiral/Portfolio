<template>
  <div class="projects">
    <div v-konami:opts.custom="easterEgg"></div>
    <v-layout align-center justify-center column fill-height >
      <div v-for="project in projects" :key="project.repo">
        <v-flex my-3>
          <v-card width="1000" hover>
            <v-img :src="project.src" aspect-ratio="2.75" :position=project.position></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ project.title }}</h3>
                <span>{{ project.desc }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat @click=setURL(project.repo)>GitHub</v-btn>
              <v-btn flat color="accent">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </div>
      <v-btn fixed fab right bottom class="mx-5 my-4 accent" v-if="edit.allow === true" router :to="edit.route">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </div>
</template>

<script>

  export default {
      data() {
          let projects = [
              { title: 'Commission Calculator',
                  desc: 'Estimates hourly wage for commission-based employees using user-provided sales information.',
                  src: require('@/img/commission-calculator.jpg'),
                  position: 'center center',
                  repo: 'https://github.com/HeadAdmiral/Commission-Calculator',
                  url: 'https://amastin-microcenter.github.io/Commission-Calculator/'
              },

              { title: 'Customer Queue',
                  desc: 'Professional customer-facing utility meant for queueing customers when a salesperson is not currently available.',
                  src: require('@/img/customer-queue.jpg'),
                  position: 'center top',
                  repo: 'https://github.com/HeadAdmiral/Customer-Queue',
                  url: 'https://amastin-microcenter.github.io/Customer-Queue/'
              },
          ]
          return {
              projects,
              opts: {
                  timeout: 3000,
                  chain: '38-38-40-40-37-39-37-39-66-65'
              },
              edit: {
                  allow: false,
                  route: '/newproject'
              }
          }
      },
      methods: {
          setURL: function(URL) {
              window.open(URL, '_blank');
          },
          easterEgg: function() {
              this.edit.allow = true;
          },

      }
  }
</script>
