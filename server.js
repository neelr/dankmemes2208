import express from 'express'
import { IgApiClient } from 'instagram-private-api'
import 'babel-polyfill'
import { get } from 'request-promise';
import bodyparse from "body-parser";
import { readFile } from 'fs';
import Jimp from 'jimp';
const app = express()
import * as Bluebird from 'bluebird';
const ig = new IgApiClient()
app.use(bodyparse.json());
async function login() {
	ig.state.generateDevice('dankmemes2208')
	await ig.account.login('dankmemes2208', process.env.PASSWORD)
}
app.get("/", (req, res) => {
	res.send("Hi! This is the instagram bot that send r/dankmemes posts! Thanks for keeping me alive!")
})
app.post("/reddit", (req, res) => {
	res.sendStatus(200);
	if (req.body.key == process.env.KEY) {
		(async () => {
			console.log("Recieved Reddit Post... Uploading....")
			await login()
			await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK).then(font => {
				Jimp.read(req.body.image, async (err, img) => {
					if (err) throw err;
					img
          				.getBuffer( "image/jpeg", async (err,Buff) => {
							const publishResult = await ig.publish.photo({
								file: Buff,
								caption: "Title: " + req.body.title + " ----------------- created by user: " + req.body.author
							});
		
							console.log('Uploaded new hot post!')
							res.end("doned")
           				})
				});
			});
		})()
	} else {
		res.send("Unauthed")
	}
})
app.get("/curr", async (req,res)=> {

    res.sendFile("/app/meme.jpg");
})
app.listen(3000, (req, res) => {
	console.log("HERE")
});
