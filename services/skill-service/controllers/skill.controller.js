import mongoose from 'mongoose';
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
    try {
      const { q, category, level, type, page = 1, limit = 20 } = req.query;
      const filter = {
        isPublic: true,
      };

      if (q) {
        filter.$or = [
          { skillName: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { tags: { $regex: q, $options: "i" } },
        ];
      }
      if (category) filter.category = category;
      if (level) filter.level = level;
      if (type) filter.type = type;
      const skills = await Skill.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      res.json(skills);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Search failed" });
    }

}

export const deleteUser = async(req,res) =>{
    const {id} = req.params;
    const response = await Skill.findByIdAndDelete(id);
    if(!response){
        return res.status(404).json({message:"skill not found"})
    }
    res.json({message:"Skill deleted"})
}

export const getMatches = async(req,res)=>{
  const userId = req.headers["x-user-id"];
    const myId = new mongoose.Types.ObjectId(req.headers["x-user-id"]);
    if(!myId)return res.status(401).json({message:"Unauthorized"});
    const mySkills = await Skill.find({authUserId:myId});
    const myOffered = mySkills.filter((s)=>s.type ==="OFFERED").map((s)=>s.skillName.toLowerCase().trim());
    const myWanted = mySkills
      .filter((s) => s.type === "WANTED")
      .map((s) => s.skillName.toLowerCase().trim());
      if(myOffered.length ==0 || myWanted.length ==0) {
        return res.json([]);
      }
      const matches = await Skill.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $ne: [{ $toString: "$authUserId" }, userId] },
                { $in: [{ $toLower: "$skillName" }, myWanted] },
                { $eq: ["$type", "OFFERED"] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "skills",
            let: { otherUserId: "$authUserId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          { $toString: "$authUserId" },
                          { $toString: "$$otherUserId" },
                        ],
                      },
                      { $eq: ["$type", "WANTED"] },
                      { $in: [{ $toLower: "$skillName" }, myOffered] },
                    ],
                  },
                },
              },
            ],
            as: "reverseMatch",
          },
        },
        { $match: { $expr: { $gt: [{ $size: "$reverseMatch" }, 0] } } },

        // ✅ DO NOT GROUP
        {
          $project: {
            otherUserId: "$authUserId",
            skillOffered: "$skillName",
            offeredSkillId: "$_id",
            reverseMatch: 1,
          },
        },
      ]);


      const response = await Promise.all(
            matches.map(async (match) => {
            const userRes = await fetch(`${process.env.USER_SERVICE}/profile/${match.otherUserId}`);
            if (!userRes.ok) return null;
            const userProfile = await userRes.json();

    return {
      user: {
        id: match.otherUserId,
        name: userProfile?.profile?.fullName || "Unknown User",
        rating: userProfile?.profile?.averageRating || 0,
        reviews: userProfile?.profile?.ratings?.length || 0,
      },
      skillOffered: match.skillOffered,
      skillWanted: match.reverseMatch[0]?.skillName,
      offeredSkillId: match.offeredSkillId,
      wantedSkillId: match.reverseMatch[0]?._id,
    };
  })
);

res.json(response.filter(Boolean));

}

export const getSkillById = async(req,res)=>{
  const {id} = req.params;
  const data = await Skill.findOne({_id:id});
  if(!data) {
   return res.status(404).json({message:"Skill not found"})
  }
  return res.status(200).json(data);
}