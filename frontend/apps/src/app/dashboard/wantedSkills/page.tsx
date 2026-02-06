"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/components/ProtectedRoutes";
import DashboardLayout from "@/components/DashboardLayout";
import { getUserFromToken } from "@/app/lib/auth";
import { createSkill, deleteSkill, getAllSkills } from "@/app/lib/skill.api";
export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSkill, setEditSkill] = useState("");
  const [editLevel, setEditLevel] = useState("");
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(getUserFromToken());
  }, []);
  const loadSkills = async () => {
    const res = await getAllSkills(user?.authUserId, user?.token || "",false);
    // console.log(res)
    setSkills(res);
  };
  useEffect(() => {
    if (!user) return;
    loadSkills();
  }, [user]);

  const addSkill = async () => {
    if (!newSkill.trim() || !newLevel.trim()) return;
    const skill = await createSkill(
      {
        authUserId: user?.authUserId,
        skillName: newSkill,
        level: newLevel.toUpperCase(),
        type: "WANTED",
        category: "General",
      },
      user?.token || "",
    );
    setSkills((prev) => [...prev, skill]);
    setNewSkill("");
    setNewLevel("");
  };

  const removeSkill = async (id: string) => {
    await deleteSkill(id, user?.token || "");
    setSkills(skills.filter((s) => s._id != id));
  };

  const startEdit = (skill: any) => {
    setEditingId(skill._id);
    setEditSkill(skill.skillName);
    setEditLevel(skill.level);
  };

  const saveEdit = (id: string) => {
    setSkills(
      skills.map((s) =>
        s._id === id ? { ...s, skillName: editSkill, level: editLevel } : s,
      ),
    );
    setEditingId(null);
    setEditSkill("");
    setEditLevel("");
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto p-8 space-y-8">
          <h1 className="text-3xl font-bold mb-4">Wanted Skills</h1>
          <Card className="p-6 space-y-4">
            <div className="flex gap-50">
              <div>Skill</div>
              <div>Level (e.g. Beginner, Intermediate, Advanced)</div>
            </div>
            <div className="flex gap-2">
              {/* <label>Skill</label> */}
              <Input
                placeholder="Skill name"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="w-1/2 border-2 border-amber-50"
              />
              {/* <label>Level (e.g. Beginner, Intermediate, Advanced)</label> */}
              <Input
                placeholder="Level (e.g. Beginner, Intermediate, Advanced)"
                value={newLevel}
                onChange={(e) => setNewLevel(e.target.value)}
                className="w-1/2 border-2 border-amber-50"
              />
              <Button onClick={addSkill} variant="default">
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {Array.isArray(skills) && skills.length === 0 && (
                <p className="text-muted-foreground">No skills added yet.</p>
              )}
              {skills.map((skill) => (
                <Card
                  key={skill._id}
                  className="flex items-center justify-between p-4"
                >
                  {editingId === skill._id ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        value={editSkill}
                        onChange={(e) => setEditSkill(e.target.value)}
                        className="w-1/2"
                      />
                      <Input
                        value={editLevel}
                        onChange={(e) => setEditLevel(e.target.value)}
                        className="w-1/2"
                      />
                      <Button
                        onClick={() => saveEdit(skill._id)}
                        variant="secondary"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 w-full">
                      <span className="font-medium text-lg">
                        {skill.skillName}
                      </span>
                      <Badge variant="outline">{skill.level}</Badge>
                      <div className="ml-auto flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(skill)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeSkill(skill._id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
