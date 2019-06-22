<template>
    <div >
        <!-- Comment form -->
        <form >
            <div class="input-field flex comment-section" style="padding:15px;background:white" >
                <input type="text"  v-model="commentTextField"  placeholder="Join the conversation, or start one!" 
                    v-on:keyup.enter.prevent="submitComment(startupcardid)">
                <!-- <button v-on:click="cardComments(startupCard.brand_id)">Console.log => cardComments method</button> -->
            </div>
        </form>


    </div>
    
</template>

<script>
import db from './firebaseInit'
import firebase, { firestore } from 'firebase'

export default {
    props: ['startupcardid'],
    name:'newcomment',
    data () {
        return {
            user: firebase.auth().currentUser.email,
            commentTextField: ""
        }
    },
    created() {
        

    },
    methods: {
         submitComment: function(identifier){
          //identifier.preventDefault()
          console.log("identifier sent with 'submitComment method' => " + identifier)
          
          // Add a new comment document with a generated id.
          let addDoc = db.collection('startupCards').doc(identifier).collection('comments').add({
            // update the database with a new document containing submitted comment info
            author: firebase.auth().currentUser.email,
            content: this.commentTextField,
            createdOn: new Date()
            //commentID:commentid // TODO: implement comment id field for searching and updating individual comments
          })
          .then(ref => {
            console.log('Added document with ID: ', ref.id);
          })
          this.commentTextField = ""
        }
      
    }

}
</script>


<style scoped>
    
</style>
