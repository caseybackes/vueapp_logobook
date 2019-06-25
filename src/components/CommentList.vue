<template>
    <div class="comment-container container">
        <div class="comment-block" v-for="(comment, index) in comments" :key="index" >
            <h6 class="card-title">{{comment.author}}</h6 >
            <p class="comment-age" style="font-size:0.7rem">{{ellapsedTime(comment.createdOn)}} ago</p>
            <p class="card-text" >{{comment.content}}</p>
            <p class="comment-edit" style="font-size:.8rem;color:red" v-if="userEmail == comment.author" v-on:click="removeComment(comment.commentID, index)" >Remove</p>
            
        </div>
    </div>
    
</template>

<script>
import db from './firebaseInit'
import firebase, { firestore } from 'firebase'

export default {
    props: ['startupcardid'],
    name:'commentlist',
    data () {
        return {
            comments: [],
            userEmail: firebase.auth().currentUser.email
        }
    },
    created() {
        console.log(this.startupcardid)
        db.collection('startupCards').doc(this.startupcardid).collection('comments').orderBy('createdOn', 'desc').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
        
                const data = { // any data you want to pull from Firestore db on the startup cards collection is put into this data object
                    'author': doc.data().author,
                    'content': doc.data().content,
                    'createdOn':doc.data().createdOn,
                    'commentID':doc.id
                }
                if(data){
                    this.comments.push(data)
                }
            })
        })

    },
    methods: {
         ellapsedTime: function(dateObj){
            var then = dateObj.toDate()
            var now = new Date()
            var age = now.getTime() - then.getTime()
            var years = 1000*3600*24*30*12
            var months = 1000*3600*24*30
            var weeks = 1000*3600*24*7
            var days = 1000*3600*24
            var hours = 1000*3600
            var minutes = 1000*60
            
            if(age/(years) > 1){
              return age/(years) >= 2 ? Math.floor(age/years) + " years " : Math.floor(age/years) + " year "
            } else if(age/months > 1) {
              return age/months >= 2 ? Math.floor(age/months) + " months " : Math.floor(age/months) + " month "
            } else if(age/weeks > 1) {
              return age/weeks >= 2 ? Math.floor(age/weeks) + " weeks " : Math.floor(age/weeks) + " week "
            }else if(age/days > 1) {
              return age/days >= 2 ? Math.floor(age/days) + " days " : Math.floor(age/days) + " day "
            }else if(age/hours > 1) {
              return age/hours >= 2 ? Math.floor(age/hours) + " hours " : Math.floor(age/hours) + " hour "
            }else if(age/minutes > 1) {
              return age/minutes >= 2 ? Math.floor(age/minutes) + " minutes " : Math.floor(age/minutes) + " minute "
            } else{
                return "just a moment "
            }
        },
        removeComment: function(commentID, index){
            db.collection('startupCards').doc(this.startupcardid).collection('comments').doc(commentID).delete()
            delete this.comments.splice(index, 1)
        }
    }

}
</script>


<style scoped>
    .comment-container{
        background: #fff;
        justify-content: left;
        text-align: left !important;
    }
    .comment-container.h4{
        margin: 0;
    }
    .comment-block{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border-bottom: 2px solid rgb(219, 217, 217);
    }
    h4{
        margin: 0;
    }
    .comment-age{
        color: dodgerblue;
        font-style: italic; 
        margin: 0;
    }
    .comment-edit{
        cursor: pointer;
        margin-bottom: 2px;
    }
    .card-title{
        margin-bottom: 5px;
    }
    
</style>
