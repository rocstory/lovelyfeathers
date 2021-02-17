import {db} from "../firebase"; 
var Filter = require('bad-words');


const BadWordsFilter = new Filter();

const MAX_NUM = 5000;

export async function containsMaliciousContent(input) {
    console.log("Is Profane:", BadWordsFilter.isProfane(input));
    return BadWordsFilter.isProfane(input);
}

export async function getFeather(name, code) {
    try {
        name = name.toLowerCase();
        code = code.toLowerCase();

        const feather = await getFeatherFromDB(name, code);
        if (feather) {
            return feather
        }
        else {
            throw new Error("Feather does not exist");
        }
    }
    catch (error) {
        // GA - log error
        return false;
    }
}

export async function createPost(username, promptResponse, feather)
{
    try
    {
        const {postTailId} = feather; 
        let post = 
        {
            createdBy: username,
            createdDate: new Date(),
            response: promptResponse,
            prevPostId: postTailId,
            nextPostId: null,
            postId: null,
        }
        console.log(`(1) - Attempting to create post:`, post)
        post = await generatePostId(post, feather);
        if (!post) throw new Error("Unable to generate post ID");
        console.log(`(1.1) - Post with generated ID:`, post.postId);

        const isPostAddedToDB = await addPostToDB(post, feather);
        if (!isPostAddedToDB) throw new Error("Post was not added to DB");
        console.log(`(1.2) - Post added to DB:`, isPostAddedToDB);
        await updateFeatherTailPostId(post.postId, feather);
        return post;
    }
    catch (error)
    {
        console.error(error);
        return false;
    }
}

// getFeather
async function getFeatherFromDB(inputName, inputCode) {
    try {
        inputName = inputName.toLowerCase();
        inputCode = inputCode.toLowerCase();

        
        const feather = await db.collection('feathers').doc(inputName).get().then(doc => {
            if (doc.exists)
            {
                const data = doc.data();
                const name = doc.id;
                const altData = Object.assign(data, {name: name});
                console.log("Document ID:", doc.id);
                console.log("Retrieved data:", data);
                if (altData.code !== inputCode)
                    throw new Error("Code does not match")
                
                return altData;
            }
        })

        console.log("Feather from DB:");
        console.log(feather);

        return feather;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}

// createPost
async function generatePostId(post, feather)
{
    try
    {
        console.log(`(2.0) - Entering: Generating Post Id:`, post, feather)

        const {name, idPrefix} = feather
        const collection = `feathers/${name}/posts`

        console.log(`(2.1) - Creating List of posts in DB.`)

        const posts = await db.collection(collection).get().then(snapshot => {
            const postList = []
            snapshot.forEach(doc => {
                postList.push(doc.id)
            })
            return postList;
        })
        .catch(error => {
            console.error(error);
            console.log(`(2.1.1) - Unable to create request.`)
            throw new Error("Unable to get document");
        })
        
        let genId = undefined
        let isIdGen = false;

        while (!isIdGen)
        {
            const newId = idPrefix.concat(getRandomNumber(0, MAX_NUM))
            isIdGen = posts.find(postId => newId === postId)
            if (!isIdGen)
            {
                genId = newId;
                isIdGen = true;
            }
        }
        console.log(`(2.2) - Generated Post: ${genId}`)
        post.postId = genId
        return post;
    }
    catch (error)
    {
        console.log(`(2.x) - ${error}`)
        return undefined;
    }
}

function getRandomNumber(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}

// TODO :: Update next post of prev post
async function addPostToDB(post, feather)
{
    try
    {
        console.log(`(3.0) - Adding post to DB:`, post, feather);

        const {name} = feather
        const {postId, createdBy, createdDate, nextPostId, prevPostId, response} = post
        await db.collection(`feathers/${name}/posts`).doc(`${postId}`).set({
            createdBy: createdBy,
            createdDate: createdDate,
            nextPostId: nextPostId,
            prevPostId: prevPostId,
            response: response
        })
        console.log(`(3.1) - Updating prev post:`, post, feather);
        const prevPostUpdated = await updatePrevPost(post, feather);

        if (!prevPostUpdated)
            throw new Error("Unable to update previous post!");
        return true;
    }
    catch (error)
    {
        console.error(error)
        console.log(`(3.x) - Error adding post to DB:`, error);
        return false;
    }
}


async function updatePrevPost(post, feather)
{
    try
    {
        const {prevPostId, postId} = post;
        const {name} = feather

        console.log(`(3.1) - Adding post to DB:`, post, feather);

        const collection = `feathers/${name}/posts`
        if (!prevPostId)
            throw new Error("no prev post to update!");

        await db.collection(collection).doc(prevPostId).update({
            nextPostId: postId
        }).then(() => {console.log("done!")})
        .catch(() => {console.log("wrong!")})
        return true;
    }
    catch (error)
    {
        //console.error(error)
        console.log(`(3.x) - Error updating post:`, post);
        return false;
    }

}

async function updateFeatherTailPostId(latestPostId, feather)
{
    try
    {
        console.log(`(4.1) - Updating Feather Tail Post ID:`, latestPostId, feather);
        const {name} = feather;

        if (!latestPostId)
            throw new Error("Error with latest post id")
        
        await db.collection("feathers").doc(name).update({
            postTailId: latestPostId
        });
        console.log(`(4.2) - Updating feather tail complete`);


    }
    catch (error)
    {
        console.log(`(4.x) - Error updating feather tail post id:`);
        return false;
    }
}



