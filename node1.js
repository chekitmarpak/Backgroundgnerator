const {MongoClient} = require('mongodb');

async function main() {
    const client = new MongoClient(uri);
    try{
        await client.connect();
        await deleteListing(client, 450);
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }

}

main().catch(console.error);

async function deleteListing(client, price) {
    const result = await client.db("Cement-product-categories").collection("Cement-product").deleteMany({"price": {$lt: price}});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_restaurants").collection("restaurants").deleteOne({name: nameOfListing});
    console.log(`${result.deletedCount} document was deleted.`);
}

//async function updateAllListingsByRestaurantId(client) {
//    const result = await client.db("sample_restaurants").collection("restaurants").updateMany({restaurant_id: {$exist: false}}, {$set: {restaurant_id: "N/A"}});

//    console.log(`${result.matchedCount} document(s) match the query criteria.`);
//    console.log(`${result.modifiedCount} document(s) was/were updated`);
//}

async function upsertListingByname(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_restaurants").collection("restaurants").updateOne({name: nameOfListing},{$set: updatedListing},{upsert: true});
    
    console.log(`${result.matchedCount} document(s) matched the query criteria`);

    if (result.upsertedCount > 0) {
        console.log(`A Document was inserted with the id ${result.upsertedId}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }
}

async function updateListingByName(client, nameOfListing, updatedListing){
    const result = await client.db("sample_restaurants").collection("restaurants").updateOne({name: nameOfListing},{$set: updatedListing});
    console.log(`${result.matchedCount} document(s) matched the query criteria`);
    console.log(`${result.modifiedCount} document(s) were/was updated.`);
}

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

    const result = await client.db("Cement-product-categories").collection("Cement-product").insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following Id(s):`);
    console.log(result.insertedIds);

}

async function createListing(client, newListing) {
    
    const result = await client.db("Cement-product-categories").collection("Cement-product").insertOne(newListing);

    console.log(`New Listing created with the following id: ${result.insertedId}`);
    console.log(result);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
