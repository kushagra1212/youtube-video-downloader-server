const express=require('express');
const router=express.Router();
const ytdl=require('ytdl-core');
const fs=require('fs');
const ytsr=require('ytsr')


let body;

router.get('/',(req,res)=>{
    res.send("home")
})

router.post('/download',(req,res)=>{
     body=req.body.body;
     
     res.json({message:"Downloading video"})
         
    
})
router.get('/download2', async(req,res)=>{
    const  {videoquality,videourl}=body;
    console.log(videourl)
    console.log(body)
    const videoid= await ytdl.getVideoID(videourl);

        const info=await ytdl.getInfo(videoid);

 
    if(info)
    {
        const videotitle=info.videoDetails.title;

        const format=ytdl.chooseFormat(info.formats,{quality:videoquality});
  

 
  
    res.header('Content-Disposition', `attachment; filename=${videotitle}.mp4`);
 


    ytdl(videourl,{format:'mp4'}).pipe(res);
    }
  
})
router.get('/search/:item',async(req,res)=>{
   const x=req.params.item;
    const result=await ytsr(x,{limit:12})
    

res.json(result)
})
module.exports=router;
