'use client';

import { useAuth } from '@/lib/auth';
import { useDataStore, CMSContent } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Settings, Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminCMS() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { cmsContent, addCMSContent, updateCMSContent, deleteCMSContent } = useDataStore();
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<CMSContent | null>(null);
  const [formData, setFormData] = useState({
    type: 'hero',
    title: '',
    content: '',
    image: '',
    isActive: true
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (editingContent) {
      setFormData({
        type: editingContent.type,
        title: editingContent.title,
        content: editingContent.content,
        image: editingContent.image || '',
        isActive: editingContent.isActive
      });
    } else {
      setFormData({
        type: 'hero',
        title: '',
        content: '',
        image: '',
        isActive: true
      });
    }
  }, [editingContent]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingContent) {
      updateCMSContent(editingContent.id, formData);
    } else {
      addCMSContent(formData);
    }
    setShowForm(false);
    setEditingContent(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      deleteCMSContent(id);
    }
  };

  const contentTypes = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'about', label: 'About Section' },
    { value: 'services', label: 'Services Section' },
    { value: 'contact', label: 'Contact Section' },
    { value: 'footer', label: 'Footer Section' }
  ];

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Content Management System</h1>
              <p className="text-gray-600 mt-2">Manage website content and sections</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Content List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5" />
                        <span>Website Content</span>
                      </CardTitle>
                      <Button 
                        className="flex items-center space-x-2"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Content</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cmsContent.map((content) => (
                        <div key={content.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{content.title}</h3>
                              <Badge variant={content.isActive ? 'default' : 'secondary'}>
                                {content.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setEditingContent(content);
                                  setShowForm(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleDelete(content.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Type: {content.type}</p>
                          <p className="text-gray-700 line-clamp-3">{content.content}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Last updated: {new Date(content.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Form */}
              <div>
                {showForm && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          {editingContent ? 'Edit Content' : 'Add New Content'}
                        </CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setShowForm(false);
                            setEditingContent(null);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Content Type</Label>
                          <Select 
                            value={formData.type} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {contentTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            rows={6}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="image">Image URL</Label>
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="rounded"
                          />
                          <Label htmlFor="isActive">Active</Label>
                        </div>

                        <Button type="submit" className="w-full">
                          <Save className="w-4 h-4 mr-2" />
                          {editingContent ? 'Update Content' : 'Add Content'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}