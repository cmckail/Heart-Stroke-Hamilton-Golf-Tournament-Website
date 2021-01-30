// import * as dotenv from "dotenv";
// dotenv.config();

// import Image from "./models/image";
// import * as fs from "fs";

// let img = fs.readFileSync(__dirname + "/dog.jpg");
// let encodedImage = img.toString("base64");

// const image = new Image({

// })

// Image.create({
//     mimetype: "image/jpeg",
//     data: Buffer.from(encodedImage, "base64"),
// })
//     .then(() => console.log("Item added."))
//     .catch((err) => console.error(err));

async function testFunc() {
    await new Promise((r) => setTimeout(r, 2000));
    return "Async done";
}

let done = testFunc().then((res) => res);

// let done = Promise.  (testFunc);

console.log(done);
