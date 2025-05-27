import React, { useState } from 'react';
import { PlusCircle, Save, Trash2 } from 'lucide-react';
import SkillTag from '../components/SkillTag';
import { mockJobRequirements } from '../utils/mockData';

interface Skill {
  id: string;
  name: string;
  isRequired: boolean;
}

interface JobRequirement {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  experience: number;
  education: string;
  isActive: boolean;
}

const JobRequirements: React.FC = () => {
  const [requirements, setRequirements] = useState<JobRequirement[]>(mockJobRequirements);
  const [newSkill, setNewSkill] = useState('');
  const [isRequired, setIsRequired] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<JobRequirement>>({
    title: '',
    description: '',
    skills: [],
    experience: 0,
    education: '',
    isActive: true
  });

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      isRequired: isRequired
    };
    
    setFormData({
      ...formData,
      skills: [...(formData.skills || []), skill]
    });
    
    setNewSkill('');
  };

  const handleRemoveSkill = (id: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter(skill => skill.id !== id)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'experience' ? parseInt(value) || 0 : value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleEditRequirement = (requirement: JobRequirement) => {
    setEditingId(requirement.id);
    setFormData(requirement);
  };

  const handleDeleteRequirement = (id: string) => {
    setRequirements(requirements.filter(req => req.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      skills: [],
      experience: 0,
      education: '',
      isActive: true
    });
    setNewSkill('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || (formData.skills || []).length === 0) {
      alert('Please fill in all required fields and add at least one skill.');
      return;
    }
    
    if (editingId) {
      // Update existing requirement
      setRequirements(
        requirements.map(req => 
          req.id === editingId 
            ? { ...formData, id: editingId } as JobRequirement
            : req
        )
      );
    } else {
      // Add new requirement
      const newRequirement: JobRequirement = {
        ...formData,
        id: Date.now().toString(),
      } as JobRequirement;
      
      setRequirements([...requirements, newRequirement]);
    }
    
    resetForm();
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Job Requirements</h1>
        <p className="mt-2 text-gray-600">
          Configure job requirements to match candidates against
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card overflow-hidden">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                {editingId ? 'Edit Requirement' : 'Create New Requirement'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title || ''}
                    onChange={handleInputChange}
                    className="mt-1 input"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    required
                    value={formData.description || ''}
                    onChange={handleInputChange}
                    className="mt-1 input"
                    placeholder="Describe the job position and requirements..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input mr-2"
                      placeholder="e.g., React.js"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="btn btn-primary flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add
                    </button>
                  </div>
                  
                  <div className="mt-2 flex items-center">
                    <input
                      type="checkbox"
                      id="isRequired"
                      checked={isRequired}
                      onChange={(e) => setIsRequired(e.target.checked)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="isRequired" className="ml-2 text-sm text-gray-700">
                      Mark as required skill
                    </label>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(formData.skills || []).map(skill => (
                      <SkillTag
                        key={skill.id}
                        skill={skill}
                        onRemove={handleRemoveSkill}
                      />
                    ))}
                    
                    {(formData.skills || []).length === 0 && (
                      <p className="text-sm text-gray-500">No skills added yet</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Minimum Experience (years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      id="experience"
                      min="0"
                      value={formData.experience || 0}
                      onChange={handleInputChange}
                      className="mt-1 input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                      Education Level
                    </label>
                    <select
                      name="education"
                      id="education"
                      value={formData.education || ''}
                      onChange={handleInputChange}
                      className="mt-1 input"
                    >
                      <option value="">Select education level</option>
                      <option value="High School">High School</option>
                      <option value="Associate's">Associate's Degree</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Active job requirement
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Update' : 'Save'} Requirement
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div>
          <div className="card overflow-hidden">
            <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                Saved Requirements
              </h2>
            </div>
            
            <ul className="divide-y divide-gray-200">
              {requirements.length === 0 ? (
                <li className="px-6 py-8 text-center text-gray-500">
                  No job requirements created yet
                </li>
              ) : (
                requirements.map(requirement => (
                  <li key={requirement.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {requirement.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {requirement.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {requirement.skills.slice(0, 3).map(skill => (
                            <SkillTag
                              key={skill.id}
                              skill={skill}
                              isEditable={false}
                            />
                          ))}
                          {requirement.skills.length > 3 && (
                            <span className="badge badge-secondary">
                              +{requirement.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-4 flex-shrink-0 flex">
                        <button
                          type="button"
                          onClick={() => handleEditRequirement(requirement)}
                          className="mr-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRequirement(requirement.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        requirement.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {requirement.isActive ? 'Active' : 'Inactive'}
                      </span>
                      
                      <span className="ml-2 text-xs text-gray-500">
                        {requirement.experience} years exp
                      </span>
                      
                      {requirement.education && (
                        <span className="ml-2 text-xs text-gray-500">
                          {requirement.education} degree
                        </span>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirements;