const {MongoClient} = require('mongodb');

async function main() {
	// we'll add code here soon
    const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.rzuyk.mongodb.net/sample_restaurants?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        await findOneListingByName(client, "Veg Junction");
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }

}

main().catch(console.error);

async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("sample_restaurants").collection("restaurants").findOne({name: nameOfListing});

    if (result) {
        console.log(`found a listing in the collection with the name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function createMultipleListings(client, newListings) {

    const result = await client.db("sample_restaurants").collection("restaurants").insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following Id(s):`);
    console.log(result.insertedIds);

}

async function createListing(client, newListing) {
    
    const result = await client.db("sample_restaurants").collection("restaurants").insertOne(newListing);

    console.log(`New Listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};