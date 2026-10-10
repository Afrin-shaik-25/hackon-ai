'use client';

import React, { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { DEMO_STUDENTS } from '@/lib/demo-data/students';
import { TaskItem } from '@/types';
import { CheckSquare, Plus, Trash2, Calendar } from 'lucide-react';

export default function StudentTasksPage() {
  const student = DEMO_STUDENTS[0];
  const [tasks, setTasks] = useState<TaskItem[]>(student.tasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-18');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState<'Academic' | 'Project' | 'Assessment' | 'Career'>('Academic');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleToggle = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: TaskItem = {
      id: `tsk-${Date.now()}`,
      title,
      dueDate,
      priority,
      category,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <DashboardShell>
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Tasks &amp; To-Do</h1>
            <p className="text-xs text-slate-500 mt-1">
              Personal study management and upcoming academic deadlines
            </p>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} className="gap-1.5 shadow-xs">
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as 'all' | 'pending' | 'completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === f
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f} ({f === 'all' ? tasks.length : f === 'pending' ? tasks.filter((t) => !t.completed).length : tasks.filter((t) => t.completed).length})
            </button>
          ))}
        </div>

        {/* Task List */}
        <Card>
          <CardContent className="p-0 divide-y divide-slate-100">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((t) => (
                <div key={t.id} className="p-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => handleToggle(t.id)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 cursor-pointer"
                    />
                    <div>
                      <p className={`font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {t.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" /> Due: {t.dueDate}
                        </span>
                        <span>&bull;</span>
                        <span className="font-medium text-slate-600">{t.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={t.priority === 'high' ? 'danger' : t.priority === 'medium' ? 'warning' : 'neutral'}>
                      {t.priority}
                    </Badge>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                No tasks matching the selected filter.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Study Task"
          description="Create a task with priority and deadline"
        >
          <form onSubmit={handleAddTask} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete OS Remedial Worksheet #2"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Due Date *</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'Academic' | 'Project' | 'Assessment' | 'Career')}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 cursor-pointer"
              >
                <option value="Academic">Academic</option>
                <option value="Project">Project Deliverable</option>
                <option value="Assessment">Assessment Practice</option>
                <option value="Career">Career Prep</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Task
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
