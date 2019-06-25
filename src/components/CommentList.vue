<template>
  <div class="comment-container container card">
    <div class="container pt-1 pb-1" style="background:white; border-bottom: 2px solid dodgerblue;">
      <b-input-group class="mt-1">
        <b-form-input type="text" v-on:keyup.enter.prevent="submitComment(startupcardid)" v-model="commentTextField"
          placeholder="Leave a comment" >
        </b-form-input>
      </b-input-group>
    </div>
    <div class="comment-block" v-for="(comment, index) in comments" :key="index">
      <h6 class="card-title pt-1 pl-1">{{comment.author}}</h6>
      <p class="comment-age pl-1" style="font-size:0.7rem">{{ellapsedTime(comment.createdOn)}} ago</p>
      <p class="card-text">{{comment.content}}</p>
      <p class="comment-edit" style="font-size:.8rem;color:red" v-if="userEmail == comment.author"
        v-on:click="removeComment(comment.commentID, index)">Remove</p>

    </div>
  </div>

</template>

<script>
  import db from './firebaseInit'
  import firebase from 'firebase'



  export default {
    props: ['startupcardid'],
    name: 'commentlist',

    data() {
      return {
        comments: [],
        userEmail: firebase.auth().currentUser.email,
        commentTextField: ''
      }
    },
    created() {
      //console.log(this.startupcardid)
      db.collection('startupCards').doc(this.startupcardid).collection('comments').orderBy('createdOn', 'desc').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // create a 'data' object that contains comment info for each comment. 
            const data = { 
              'author': doc.data().author,
              'content': doc.data().content,
              'createdOn': doc.data().createdOn,
              'commentID': doc.id
            }
            // send each data instance the local comments array for iterive rendering
            this.comments.push(data)
          })
        })
    },
    methods: {
      ellapsedTime: function (dateObj) {
        // Took a while to figure out, but when the 'dateObj' is from a newly created comment, it's in a 
        // different format than the data pulled from Firebase (Timestamp obj {})
        var then = dateObj.seconds ? dateObj.toDate() : dateObj
        var now = new Date()
        var age = now.getTime() - then.getTime()
        var years = 1000 * 3600 * 24 * 30 * 12
        var months = 1000 * 3600 * 24 * 30
        var weeks = 1000 * 3600 * 24 * 7
        var days = 1000 * 3600 * 24
        var hours = 1000 * 3600
        var minutes = 1000 * 60

        if (age / (years) > 1) {
          return age / (years) >= 2 ? Math.floor(age / years) + " years " : Math.floor(age / years) + " year "
        } else if (age / months > 1) {
          return age / months >= 2 ? Math.floor(age / months) + " months " : Math.floor(age / months) + " month "
        } else if (age / weeks > 1) {
          return age / weeks >= 2 ? Math.floor(age / weeks) + " weeks " : Math.floor(age / weeks) + " week "
        } else if (age / days > 1) {
          return age / days >= 2 ? Math.floor(age / days) + " days " : Math.floor(age / days) + " day "
        } else if (age / hours > 1) {
          return age / hours >= 2 ? Math.floor(age / hours) + " hours " : Math.floor(age / hours) + " hour "
        } else if (age / minutes > 1) {
          return age / minutes >= 2 ? Math.floor(age / minutes) + " minutes " : Math.floor(age / minutes) + " minute "
        } else {
          return "moments "
        }
      },
      removeComment: function (commentID, index) {
          // remove the comment from the database
          db.collection('startupCards').doc(this.startupcardid).collection('comments').doc(commentID).delete()
          // remove the comment from the local comments array (updates the view instantly)
          delete this.comments.splice(index, 1)
      },
      submitComment: function (startupcardid) {
        // Add a new comment document with a generated id.
        // The data object will be updated with a Firebase document ID once it is uploaded to the database,
        // after which we will append that document ID to the posted comment's data object, so that it 
        // is possible for the author to remove the comment from the database using that document ID.  
        const data = {
            'author':firebase.auth().currentUser.email,
            'content':this.commentTextField,
            'createdOn': new Date()
        }
        let addDoc = db.collection('startupCards').doc(startupcardid).collection('comments').add({
            // add the new comment document to the database, with only the 
            // key:value pairs in the data object - hence the spread operator.            
            ...data
          })
          .then(ref => {
            // update the data object with the newly generated Firebase document ID
            data.commentID = ref.id
          })
        // append this new comment to the beginning of the local 'comments' array
        this.comments.unshift(data)
        // reset the input box for a new comment. -- might optionally hide this input box after a single comment...? this idea needs a legit use case. 
        this.commentTextField = ""
      }
    }
  }
</script>


<style scoped>
  .comment-container {
    background: #fff;
    justify-content: left;
    text-align: left !important;
  }

  .comment-container.h4 {
    margin: 0;
  }

  .comment-block {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    border-bottom: 2px solid rgb(219, 217, 217);
  }

  h4 {
    margin: 0;
  }

  .comment-age {
    color: dodgerblue;
    font-style: italic;
    margin: 0;
  }

  .comment-edit {
    cursor: pointer;
    position: relative;
    bottom: 20px;
    text-decoration: underline;
  }

  .card-title {
    margin-bottom: 5px;
  }

</style>
