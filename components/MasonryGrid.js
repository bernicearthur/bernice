import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AiFillPushpin } from 'react-icons/ai';
import LightboxModal from './LightboxModal';

const MasonryGrid = ({ items, onLoadMore }) => {
  const [columns, setColumns] = useState(4);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pinnedItems, setPinnedItems] = useState({});
  const [hiddenItems, setHiddenItems] = useState({});
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (inView) {
      onLoadMore?.();
    }
  }, [inView, onLoadMore]);

  const getColumns = () => {
    const cols = Array.from({ length: columns }, () => []);
    
    // Sort items: pinned first, then regular items
    const sortedItems = [...items].sort((a, b) => {
      if (pinnedItems[a.id] && !pinnedItems[b.id]) return -1;
      if (!pinnedItems[a.id] && pinnedItems[b.id]) return 1;
      return 0;
    });

    // Filter out hidden items and distribute to columns
    sortedItems
      .filter(item => !hiddenItems[item.id])
      .forEach((item, i) => {
        cols[i % columns].push(item);
      });
    
    return cols;
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handlePin = (itemId) => {
    setPinnedItems(prev => {
      const newPinnedItems = { ...prev };
      if (newPinnedItems[itemId]) {
        delete newPinnedItems[itemId];
      } else {
        newPinnedItems[itemId] = true;
      }
      return newPinnedItems;
    });
  };

  const handleHide = (itemId) => {
    setHiddenItems(prev => ({
      ...prev,
      [itemId]: true
    }));
    setSelectedItem(null); // Close modal when hiding item
  };

  const getRelatedItems = (currentItem) => {
    if (!currentItem) return [];
    return items.filter(item => 
      item.id !== currentItem.id && 
      !hiddenItems[item.id] &&
      (item.category === currentItem.category || Math.random() > 0.7)
    ).slice(0, 5);
  };

  const getCurrentIndex = () => {
    if (!selectedItem) return -1;
    return items.findIndex(item => item.id === selectedItem.id);
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex > 0) {
      setSelectedItem(items[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex < items.length - 1) {
      setSelectedItem(items[currentIndex + 1]);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex gap-3">
          {getColumns().map((column, i) => (
            <div key={i} className="flex-1 flex flex-col gap-3">
              {column.map((item, index) => {
                const sizeClass = item.featured ? 'aspect-square' : 
                                item.category === 'Project' ? 'aspect-[4/3]' :
                                item.category === 'Blog' ? 'aspect-[3/4]' :
                                item.category === 'Story' ? 'aspect-[2/3]' :
                                'aspect-[3/4]';
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
                    onClick={() => handleItemClick(item)}
                  >
                    {pinnedItems[item.id] && (
                      <div className="absolute top-2 right-2 z-10 bg-black/50 p-1.5 rounded-full">
                        <AiFillPushpin className="w-4 h-4 text-purple-500" />
                      </div>
                    )}
                    <div className={`relative ${sizeClass}`}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-base font-semibold line-clamp-1 mb-2 text-white drop-shadow-lg">{item.title}</h3>
                          <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-lg">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <div ref={ref} className="h-10" />
      </div>

      <LightboxModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        currentItem={selectedItem}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasNext={getCurrentIndex() < items.length - 1}
        hasPrevious={getCurrentIndex() > 0}
        relatedItems={getRelatedItems(selectedItem)}
        onPin={handlePin}
        onHide={handleHide}
        isPinned={selectedItem ? pinnedItems[selectedItem.id] : false}
      />
    </>
  );
};

export default MasonryGrid; 