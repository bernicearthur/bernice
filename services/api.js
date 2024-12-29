import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createContent = async (data) => {
  try {
    const response = await api.post('/api/contents', {
      data: {
        title: data.title,
        content: data.content,
        contentType: data.type,
        category: data.category,
        tags: data.tags,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        featuredImage: data.featuredImage,
        status: 'draft',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('files', file);
    
    const response = await api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/api/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (name) => {
  try {
    const response = await api.post('/api/categories', {
      data: {
        name,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('/api/tags');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTag = async (name) => {
  try {
    const response = await api.post('/api/tags', {
      data: {
        name,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 