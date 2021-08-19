//API FETCH REQUESTES 
const router = require('express').Router();
const fs = require("fs");

const { v4: uuidv4 } = require('uuid');
//GET ROUTE 


router.get('/notes', (req, res) => {

    //Read the JSON file,grab all notes  and send back the JSON object to notes.html page
    fs.readFile('./db/db.json', "utf-8", (err, response) => {
        if (err) {
            console.log("Error at ", err);
        } else {
            // console.log(response)
            //convert the response to JSON 
            let noteInfo = JSON.parse(response) || [];
            // console.log(noteInfo)

            //return the notes 
            res.json(noteInfo);
        }

    })
});
//POST 

router.post('/notes', (req, res) => {

    //Read the JSON file, grab all existing notes 
    fs.readFile('./db/db.json', "utf-8", (err, response) => {
        if (err) {
            console.log("Error at ", err);
        } else {
            // console.log(response)
            //convert the response to JSON 
            let existingNotes = JSON.parse(response) || [];
            // console.log("OLD", existingNotes)
            //npm package uuid

            const newNote = {
                ...req.body, id: uuidv4()//package
            };

            // console.log("NEW", newNote);
            //combine the notes 
            const combineNotes = [...existingNotes, newNote];
            console.log("Combined list", combineNotes);
            //update the file 
            fs.writeFile('./db/db.json', JSON.stringify(combineNotes), err => {
                if (err) { console.log(err); }
                else {
                    console.log("Created new note sucessfully!!!!");
                    //return the combined notes 
                    res.json(combineNotes);
                }

            })


        }

    })


});

//DELETE 

router.delete('/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id;
    // console.log("Delete note", deleteNoteId);
    //Read the JSON file, grab all existing notes 
    fs.readFile('./db/db.json', "utf-8", (err, response) => {
        if (err) {
            console.log("Error at ", err);
        } else {

            //convert the response to JSON 
            let existingNotes = JSON.parse(response) || [];
            console.log("All notes", existingNotes);
            //Filter out the note u like to delete 
            const result = existingNotes.filter(note => note.id !== deleteNoteId);
            console.log("Filter values", result);
            //then call fs.writeFIle with the new values 
            //update the file 
            fs.writeFile('./db/db.json', JSON.stringify(result), err => {
                if (err) { console.log(err); }
                else {
                    console.log("Delete new note sucessfully!!!!", deleteNoteId);
                    //return the filtered notes to the htmlpage 
                    res.json(result);
                }

            })
        }
    });


});

module.exports = router;