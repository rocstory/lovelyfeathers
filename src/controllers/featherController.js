
function getFeathersFromDB()
{
    const feathers = [
        {
            name:"a",
            id:"a"
        }
    ]
    return feathers;
}


export async function validateFeatherCode(name, id)
{
    name = name.toLowerCase();
    id = id.toLowerCase();

    const feathers = await getFeathersFromDB();
    console.log(feathers);

    const foundFeather = feathers.find(feather => {
        const fName = feather.name.toLowerCase();
        const fId = feather.id.toLowerCase();
        if (name === fName && id === fId)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    console.log("Founded feather:", foundFeather);
    const isFound = (foundFeather !== undefined);

    console.log("Feather is found?", isFound);
    
    return isFound;
}

