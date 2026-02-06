import axios from 'axios';

const SKILL_SERVICE_URL = process.env.SKILL_SERVICE_URL || "http://localhost:4003";

export const addSkills = async(req,res)=>{
    try{
        const response = await axios.post(`${SKILL_SERVICE_URL}`,req.body);
        res.status(201).json(response.data);
    }catch(err) {
        res.status(err?.response.status || 500).json(err.response?.data || {error:"Skill not added"});
    }
}

export const getUserSkills = async(req,res) =>{
    try{
        const response = await axios.get(`${SKILL_SERVICE_URL}/user/${req.params.authUserId}`);
        res.json(response.data);
    }catch(err) {
        res
          .status(err?.response.status || 500)
          .json(err.response?.data || { error: "no user skill found" });
    }
}

export const searchSkills = async(req,res)=>{
    try{
        const response = await axios.get(`${SKILL_SERVICE_URL}/search`,{params:req.query});
        res.json(response.data);
    }catch(err) {
        res
          .status(err?.response.status || 500)
          .json(err.response?.data || { error: "Skill is not Search" });

    }
}

export const deleteSkill = async(req,res)=>{
    try{
        await axios.delete(`${SKILL_SERVICE_URL}/${req.params.id}`);
        res.json({message:"Skill deleted"});
    }catch(err){
     res
    .status(err?.response.status || 500)
    .json(err.response?.data || { error: "User not found" });

    }
}

export const getMatches = async(req,res)=>{
    try {
        const response = await axios.get(`${SKILL_SERVICE_URL}/matches`,{
            headers:{
               Authorization:req.headers.authorization
            }
        });
        return res.json(response.data);
    } catch (err) {
        console.log(err)
         res.json(err.response?.data || { error: "Not matching skills" });
    }
}