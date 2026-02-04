
"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Skill {
	id: number;
	name: string;
	level: string;
}

const initialSkills: Skill[] = [
	{ id: 1, name: "React", level: "Advanced" },
	{ id: 2, name: "UI/UX Design", level: "Intermediate" },
	{ id: 3, name: "Python", level: "Beginner" },
];

export default function SkillsPage() {
	const [skills, setSkills] = useState<Skill[]>(initialSkills);
	const [newSkill, setNewSkill] = useState("");
	const [newLevel, setNewLevel] = useState("");
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editSkill, setEditSkill] = useState("");
	const [editLevel, setEditLevel] = useState("");

	const addSkill = () => {
		if (!newSkill.trim() || !newLevel.trim()) return;
		setSkills([
			...skills,
			{ id: Date.now(), name: newSkill.trim(), level: newLevel.trim() },
		]);
		setNewSkill("");
		setNewLevel("");
	};

	const removeSkill = (id: number) => {
		setSkills(skills.filter((s) => s.id !== id));
	};

	const startEdit = (skill: Skill) => {
		setEditingId(skill.id);
		setEditSkill(skill.name);
		setEditLevel(skill.level);
	};

	const saveEdit = (id: number) => {
		setSkills(skills.map((s) => (s.id === id ? { ...s, name: editSkill, level: editLevel } : s)));
		setEditingId(null);
		setEditSkill("");
		setEditLevel("");
	};

	return (
		<div className="max-w-2xl mx-auto p-8 space-y-8">
			<h1 className="text-3xl font-bold mb-4">My Skills</h1>
			<Card className="p-6 space-y-4">
				<div className="flex gap-2">
					<Input
						placeholder="Skill name"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className="w-1/2"
					/>
					<Input
						placeholder="Level (e.g. Beginner, Intermediate, Advanced)"
						value={newLevel}
						onChange={(e) => setNewLevel(e.target.value)}
						className="w-1/2"
					/>
					<Button onClick={addSkill} variant="default">
						Add
					</Button>
				</div>
				<div className="space-y-2">
					{skills.length === 0 && <p className="text-muted-foreground">No skills added yet.</p>}
					{skills.map((skill) => (
						<Card key={skill.id} className="flex items-center justify-between p-4">
							{editingId === skill.id ? (
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
									<Button onClick={() => saveEdit(skill.id)} variant="secondary">
										Save
									</Button>
									<Button onClick={() => setEditingId(null)} variant="secondary">
										Cancel
									</Button>
								</div>
							) : (
								<div className="flex items-center gap-4 w-full">
									<span className="font-medium text-lg">{skill.name}</span>
									<Badge variant="outline">{skill.level}</Badge>
									<div className="ml-auto flex gap-2">
										<Button size="sm" variant="outline" onClick={() => startEdit(skill)}>
											Edit
										</Button>
										<Button size="sm" variant="destructive" onClick={() => removeSkill(skill.id)}>
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
	);
}
