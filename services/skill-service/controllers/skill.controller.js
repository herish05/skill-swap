import Skill from '../models/skill.model.js';

export const addSkill = async(req,res)=>{
    const data = req.body;
    const skill = await Skill.create(data);
    res.status(201).json(skill);
}
export const getUserSkills = async(req,res)=>{
    const {authUserId} = req.params;
    const skills = await Skill.find({authUserId});
    res.json({skills});

}

export const searchSkills = async(req,res)=>{
    const {q,category,level,type} = req.query;
    const filter = {isPublic:true};
    if(q)filter.skillName = new RegExp(q,"i");
    if(category)filter.category = category;
    if(level)filter.level = level;
    if(type)filter.type = type;
    console.log(filter);
    const skills = await Skill.find(filter).limit(20);
    res.json(skills);
}

export const deleteUser = async(req,res) =>{
    const {id} = req.params;
    const response = await Skill.findByIdAndDelete(id);
    if(!response){
        return res.status(404).json({message:"skill not found"})
    }
    res.json({message:"Skill deleted"})
}