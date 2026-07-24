import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/products';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Search } from 'lucide-react';

export default function CollectionsPage() {
  const { products } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Filtering dynamically from useAdmin products
  let filtered = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  // Calculate Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#735c00] uppercase tracking-widest">
          The Full Boutique Catalogue
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#003426]">
          Luxury Collections
        </h1>
        <p className="text-sm text-[#404944]">
          Explore our exclusive range of Nigerian Atampa, embellished Swiss Voile Lace, and bespoke Silk Abayas.
        </p>
      </div>

      {/* Filter Bar & Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-[#bfc9c3]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.id.toLowerCase()
                  ? 'bg-[#0f4c3a] text-white shadow-md'
                  : 'bg-[#efeeea] text-[#003426] hover:bg-[#dbdad6]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 md:w-60">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
            <input
              type="text"
              placeholder="Filter products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-2 bg-[#fbf9f5] border border-[#bfc9c3] rounded-lg text-xs font-sans text-[#003426] focus:outline-none focus:border-[#735c00]"
            />
          </div>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-2 bg-[#fbf9f5] border border-[#bfc9c3] rounded-lg text-xs font-semibold text-[#003426] focus:outline-none focus:border-[#735c00] appearance-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

        </div>

      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-[#bfc9c3]/30 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#efeeea] flex items-center justify-center text-[#735c00] mx-auto">
            <SlidersHorizontal size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#003426]">No products found</h3>
          <p className="text-xs text-[#707974] max-w-sm mx-auto">
            We couldn't find any pieces matching your current filters. Try resetting your search query or selecting another category.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setCurrentPage(1); }}
            className="px-6 py-2.5 bg-[#0f4c3a] text-white text-xs uppercase font-semibold tracking-wider rounded-lg hover:bg-[#003426] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#bfc9c3]/40 text-xs text-[#404944]">
              <div>
                Showing <span className="font-bold text-[#003426]">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-[#003426]">{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}</span> of{' '}
                <span className="font-bold text-[#003426]">{filtered.length}</span> luxury items
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={validCurrentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#bfc9c3] disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-[#003426] hover:bg-[#efeeea] transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors ${
                        page === validCurrentPage
                          ? 'bg-[#0f4c3a] text-white shadow-sm'
                          : 'bg-white border border-[#bfc9c3] text-[#003426] hover:bg-[#efeeea]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  disabled={validCurrentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#bfc9c3] disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-[#003426] hover:bg-[#efeeea] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
