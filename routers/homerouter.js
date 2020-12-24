const express=require('express');
const router=express.Router();
const ytdl=require('ytdl-core');
const fs=require('fs');



let body;

router.get('/',(req,res)=>{
    res.send("home")
})

router.post('/download',(req,res)=>{
     body=req.body.body;
     
     res.json({message:"Downloading video"})
         
    
})
router.get('/download2', (req,res)=>{
    const  {videoquality,videourl}=body;
    console.log(body)
    const videoid= ytdl.getVideoID(videourl);
    try{
        const info=ytdl.getInfo(videoid);
    }
    catch(err)
    {
        console.log(err)
    }
    
    const videotitle=info.videoDetails.title;
    try{
        const format=ytdl.chooseFormat(info.formats,{quality:videoquality});
    }catch(err)
    {
        console.log(err,"this eeee")
    }
  
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
 


    ytdl(videourl,{format:'mp4'}).pipe(res);
  
})

module.exports=router;
