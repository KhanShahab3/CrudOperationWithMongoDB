const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/playgorund')
.then(() => console.log('Connected to playgorund database'))
.catch(err => console.error('Could not connect to playgorund database', err));


//what is Schema then?
//schema is define shape of document within a collection
const courseSchema=new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
});
//what is model then?
//model is a class that we can use to create and read documents from a collection
const Course=mongoose.model('Course',courseSchema);
//now we can use Course class to create and read documents from courses collection
async function createCourse(){
    const course=new Course({
        name:'DIT',  
        author:'Vijay',
        tags:['Word','Excel','PowerPoint'],
        isPublished:true
        })
    const result=await course.save();
    console.log(result);
    }
createCourse();