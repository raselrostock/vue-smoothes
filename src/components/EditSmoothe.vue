<template>
  <div v-if="smoothe" class="edit-smoothe container">
    <h2>{{ smoothe.title }}</h2>
    <form @submit.prevent="editSmoothe">
      <div class="field title">
        <label for="title">Smoothe Title</label>
        <input type="text" name="title" v-model="smoothe.title">
      </div>
      <div v-for="(ing,index) in smoothe.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="smoothe.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="addIngredient"
          v-model="another"
        >
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback}}</p>
        <button class="btn pink">Edit Smoothe</button>
      </div>
    </form>
  </div>
</template>
<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditSmoothe",
  data() {
    return {
      smoothe: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editSmoothe() {
      if (this.smoothe.title) {
        this.feedback = null;
        this.smoothe.slug = slugify(this.smoothe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("smoothes")
          .doc(this.smoothe.id)
          .update({
            title: this.smoothe.title,
            ingredients: this.smoothe.ingredients,
            slug: this.smoothe.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.feedback = "You must enter a smoothe title";
      }
    },
    addIngredient() {
      if (this.another) {
        this.smoothe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothe.ingredients = this.smoothe.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("smoothes")
      .where("slug", "==", this.$route.params.sm_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothe = doc.data();
        this.smoothe.id = doc.id;
      });
    });
  }
};
</script>
<style>
.edit-smoothe {
  margin-top: 60px;
  padding: 20px;
  min-width: 500px;
}
.edit-smoothe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothe .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>