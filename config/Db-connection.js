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
// createCourse();

async function getCourses(){
    const courses=await Course.find();
    console.log(courses);
}
// getCourses();

//Get All publish courses sort by their name pick only there name and author
async function getPublishedCourses(){
   const courses=await Course.find({isPublished:true})
   .sort({name:1})
   .select({name:1,author:1})
   console.log(courses);
}
// getPublishedCourses();

//get all published backend courses or frontend courses sort in decesending order by their  name pick only their name and author

async function getPublishedCoursesByTags(){

    // var courses=await Course.find({isPublished:true,tags:{$in:['backend','frontend']}})
    var courses=await Course.find({isPublished:true})
    .or([{tags:'backend'},{tags:'frontend'}])
    .sort({name:-1})
    .select({name:1,author:1})
    console.log(courses);
}
//  getPublishedCoursesByTags();

//update course
async function updateCourse(id){
    //approach 1: query first
    const course=await Course.findById(id);
    if(!course) return;
    course.isPublished=true;
    course.author='New Author';
    const result=await course.save();
    console.log(result);
 

}
updateCourse("68ab20c875fd3f03aad88f62");
