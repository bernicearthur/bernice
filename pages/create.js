import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiVideo, FiFile, FiX, FiUpload, FiCheck, FiTrash2, FiEye } from 'react-icons/fi';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useTheme } from '../components/theme';
import styles from '../styles/editor.module.css';

// Import CKEditor dynamically to avoid SSR issues
const Editor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
  { 
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-background rounded-lg w-full h-[400px]"></div>
    ),
  }
);

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const slideIn = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const CreateContent = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [contentType, setContentType] = useState('blog');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mediaGallery, setMediaGallery] = useState([]);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [editorData, setEditorData] = useState('');
  const [categories, setCategories] = useState(['technology', 'design', 'development', 'business', 'lifestyle']);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Editor configuration
  const editorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
        'insertTable',
        'undo',
        'redo'
      ]
    },
    placeholder: 'Write something amazing...',
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }, []);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePublish = async () => {
    console.log({
      type: contentType,
      title,
      content: editorData,
      category,
      tags,
      featuredImage,
      seoTitle,
      seoDescription
    });
    router.push('/dashboard');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter(cat => cat !== categoryToRemove));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-border rounded w-1/4"></div>
            <div className="h-[600px] bg-border rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Create New Content</h1>
        </motion.div>

        <motion.div
          variants={slideIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content Type Selection */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              <div className="flex space-x-4">
                {['blog', 'story', 'project'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
                      contentType === type
                        ? 'bg-accent text-white'
                        : 'bg-background text-secondary hover:text-primary'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 text-xl font-semibold bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* CKEditor */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              <div className={`${styles.editor} ${theme === 'dark' ? 'dark' : ''}`}>
                {mounted && (
                  <Editor
                    onReady={editor => {
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorData(data);
                    }}
                    editor={require('@ckeditor/ckeditor5-build-classic')}
                    config={editorConfig}
                    data={editorData}
                  />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="px-6 py-2 flex items-center gap-2 text-secondary hover:text-primary border border-border rounded-lg transition-colors duration-200"
              >
                <FiEye className="w-5 h-5" />
                {previewMode ? 'Edit Mode' : 'Preview'}
              </button>
              <button
                onClick={handlePublish}
                className="px-8 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-200"
              >
                Publish
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              <h2 className="text-lg font-semibold text-primary mb-4">Featured Image</h2>
              <div
                className={`relative h-48 border-2 border-dashed rounded-lg overflow-hidden transition-colors duration-200 ${
                  isDragging ? 'border-accent bg-accent/10' : 'border-border'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {featuredImage ? (
                  <div className="relative h-full">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setFeaturedImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary">
                    <FiUpload className="w-8 h-8 mb-2" />
                    <p className="text-sm">Drag & drop or click to upload</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Category Selection */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              {/* Quick Category Creation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Quick Add Category</h3>
                <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary mb-2">Select Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags Section */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Tags</label>
                <form onSubmit={handleTagAdd} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors duration-200"
                  >
                    Add
                  </button>
                </form>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="hover:text-accent-hover"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-card-background p-6 rounded-lg shadow-md border border-border">
              <h2 className="text-lg font-semibold text-primary mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Enter SEO title"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Meta Description</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Enter meta description"
                    rows="3"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Media Manager Modal */}
        <AnimatePresence>
          {showMediaManager && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card-background rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-primary">Media Manager</h2>
                    <button
                      onClick={() => setShowMediaManager(false)}
                      className="text-secondary hover:text-primary"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center ${
                      isDragging ? 'border-accent bg-accent/10' : 'border-border'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <FiUpload className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <p className="text-secondary mb-2">Drag & drop files here</p>
                    <span className="text-sm text-secondary">or</span>
                    <label className="block mt-2">
                      <span className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg cursor-pointer transition-colors duration-200">
                        Browse Files
                      </span>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(Array.from(e.target.files))}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                    {mediaGallery.map((media) => (
                      <div
                        key={media.id}
                        className="relative group rounded-lg overflow-hidden border border-border"
                      >
                        {media.type === 'image' ? (
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-32 object-cover"
                          />
                        ) : media.type === 'video' ? (
                          <div className="w-full h-32 bg-background flex items-center justify-center">
                            <FiVideo className="w-8 h-8 text-secondary" />
                          </div>
                        ) : (
                          <div className="w-full h-32 bg-background flex items-center justify-center">
                            <FiFile className="w-8 h-8 text-secondary" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              // Add media insertion logic here
                              setShowMediaManager(false);
                            }}
                            className="p-2 bg-accent hover:bg-accent-hover text-white rounded-full transition-colors duration-200"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setMediaGallery(mediaGallery.filter(m => m.id !== media.id))}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </div>
  );
};

export default CreateContent; 