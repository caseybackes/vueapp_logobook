<template>
    <div style="background:#e0e0e0">
        <div v-for="(comment, index) in comments" :key="index">
            <h1>{{comment.author}}</h1>
            <h4>{{comment.content}}</h4>
        </div>
    </div>
    
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
    props: ['startupcardid'],
    name:'comment',
    data () {
        return {
            comments: []
        }
    },
    created() {
        console.log(this.startupcardid)
        db.collection('startupCards').doc(this.startupcardid).collection('comments').get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const data = { // any data you want to pull from Firestore db on the startup cards collection is put into this data object
                    'author': doc.data().author,
                    'content': doc.data().content
                }
                if(data){
                    this.comments.push(data)
                }
            })
        })

    }

}
</script>
