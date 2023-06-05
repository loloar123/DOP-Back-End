const express= require("express");
const { validateEvent, EventModel } = require("../models/eventModel");
const router = express.Router();

router.post("/" , async(req,res) => {   

    let validateBody = validateEvent(req.body);
    if(validateBody.error){
        return res.status(400).json(validateBody.error.details);
    }
    try {
        let event = new EventModel(req.body);
        await event.save();
        res.json(event);
    }catch(err){
        console.log(err);
        res.status(502).json({err});
    }

})



module.exports = router;