var exports = module.exports = DataAccess;

function DataAccess()
{
    //declared the constructor and the client/url values.
    DataAccess.prototype.MongoClient =  require('mongodb').MongoClient;
    DataAccess.prototype.url= 'mongodb://rlms:rlmsreact@ds017636.mlab.com:17636/rlms';
}
// if username is null, get all users. Result is passed in callback!
DataAccess.prototype.getUsers =(username,callback)=>{


    var url = DataAccess.prototype.url;
    DataAccess.prototype.MongoClient.connect(url,(err,db)=> {
            if(!err)
            {
                if(err){console.log(err)}
                var cursor;
                if(!username)
                {
                    cursor = db.collection('user').find();

                }else{
                    cursor = db.collection('user').find({username:username});
                }
                var result=[];
                cursor.each((err,doc)=>{
                    if(doc){
                        result.push(doc);
                    }else{callback(result)}
                })
            }else{
                console.log(err);
            }
    });
};
// check if user exists, if not insert new user, else update old user.
DataAccess.prototype.addOrUpdateUser=(user,callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var url = DataAccess.prototype.url;
    var other =[];
    // attempt to get the user. If the use exists, make it fail.
    DataAccess.prototype.getUsers(user.username,(result)=>{
        // get the ID of the first result.
        if(result.length > 0 ){
            console.log(result);

            user._id = result[0]._id;

    }
        if(user)
        {

            var newUser = {
                username: user.username,
                _id : user._id,
                id:user.id,
                is_admin:user.is_admin,
                is_active:user.is_active,
                f_name:user.f_name,
                l_name:user.l_name,
                email:user.email,
                batch:user.batch,
                password:user.password
            };
            client.connect(url,(err,db)=>{
                db.collection('user').save(newUser,(err)=>{
                    if(err){callback('error')}
                    else {callback('success')}
                })
            })
        }else{callback('fail')}
    });




};
// get forums related to batchname, if null return all.
DataAccess.prototype.getForums=(batchName,callback)=>{//todo
    var client = DataAccess.prototype.MongoClient;
    var url = DataAccess.prototype.url;
    var cursor;
    client.connect(url,(err,db)=>{
        if(batchName)
        {
            cursor = db.collection('forum').find({batchName:batchName})
            console.log('Ive been called!')
        }else{
            cursor = db.collection('forum').find();
        }
        var result = [];
        cursor.each((err,doc)=>{
            if(doc){
                result.push(doc);
            }else{
                callback(result);
            }
        })
    });


};
//... same as previous update method.
DataAccess.prototype.addOrUpdateForums=(forum,callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var url = DataAccess.prototype.url;
    var newForm = {
      batchName:forum.batchName,
      description:forum.description,
      posts:forum.posts,
    };
    if(forum){
        DataAccess.prototype.getForums(newForm.batchName,(result)=>{
            if(result.length > 0 )
            {newForm._id = result[0]._id;
                console.log('duplicate found');
            }
                client.connect(url,(err,db)=>{
                    console.log(err);
                    db.collection('forum').save(newForm,(err)=>{

                        if(!err){
                            console.log('Entry successfully added to the database');
                            callback('Entry successfully added');
                        }
                        else{console.log("this fuck?")}

                    })
                })

        })
    }else{
        console.log('cannot insert a null value into the database');
    }
 };
DataAccess.prototype.getLessons=(lessonName,callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var url = DataAccess.prototype.url;
    var cursor;
    client.connect(url, (err,db)=>{
        if(lessonName) {
            cursor = db.collection('lesson').find({curriculum:lessonName});
        }else{
            cursor = db.collection('lesson').find();
        }
        var result=[];
        cursor.each((err,doc)=>{
            if(doc){result.push(doc)}
            else{ db.close(); callback(result);}
        })
    })
};

DataAccess.prototype.addOrUpdateLessons=(lesson,callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var url = DataAccess.prototype.url;
    client.connect(url, (err,db)=>{
        DataAccess.prototype.getLessons(lesson.batchName,(result)=>{
            if(result.length > 0 ){
                lesson._id = result[0]._id;
            }
            var newLesson = {
                _id:lesson._id,
                curriculum:lesson.curriculum,
                title:lesson.title,
                week:lesson.week,
                topic:lesson.topic
            };
            db.collection('lesson').save(newLesson,(err)=>{
               if(err){console.log(err)}
               else{callback('Success')}
            });

        })
    })


};
// exam doesn't accept an exam name. Always returns all questions.

DataAccess.prototype.getExams=(callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var  url = DataAccess.prototype.url;
    client.connect(url,(err,db)=>{
        var result =[];
        var cursor =db.collection('exam').find();
        cursor.each((err,doc)=>{
            if(doc){
                result.push(doc);
            }else{callback(result)}
        })

    })
};
// add exam to database. Callback provides result.

DataAccess.prototype.addOrUpdateExams=(exam, callback)=>{
    var client = DataAccess.prototype.MongoClient;
    var  url = DataAccess.prototype.url;
    var newExam = {
        topic: exam.topic,
        questions: exam.questions

    };
    client.connect((err,db)=>{
        db.collection('exam').save(exam,(err)=>{
            if(!err){callback('success')}
        })
    })
};
