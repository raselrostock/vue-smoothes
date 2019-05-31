<template>
  <div class="index container">
    <div class="card" v-for="( smoothe, ind) in smoothes" :key="ind">
      <div class="card-container">
        <i @click="deleteSmoothe(smoothe.id )" class="material-icons delete">delete</i>
        <h2 class="indigo-text">{{ smoothe.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, ind) in smoothe.ingredients" :key="ind">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name:'EditSmoothe', params:{sm_slug:smoothe.slug}}">
          <i class="material-icons">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      smoothes: []
    };
  },
  methods: {
    deleteSmoothe(smid) {
      //Delete doc from firestore
      db.collection("smoothes")
        .doc(smid)
        .delete()
        .then(() => {
          this.smoothes = this.smoothes.filter(smoothe => {
            return smoothe.id != smid;
          });
        });
    }
  },
  created() {
    // fetch data from the firestore
    db.collection("smoothes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let smoothe = doc.data();
          smoothe.id = doc.id;
          this.smoothes.push(smoothe);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 30px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  color: #aaa;
  font-size: 1.4em;
  right: 4px;
  cursor: pointer;
}
</style>