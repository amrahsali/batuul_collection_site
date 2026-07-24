import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CATEGORIES } from '../../data/products';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, updateStock } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  const ITEMS_PER_PAGE = 10;

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: 'Abayas',
    price: '',
    stock: '',
    badge: 'Signature',
    image: '/assets/abaya.png',
    description: '',
    fabricDetails: '',
    careInstructions: 'Professional dry clean only.',
    sizes: 'S (54), M (56), L (58), XL (60)',
    colors: 'Emerald Green, Metallic Gold'
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      category: 'Abayas',
      price: '',
      stock: '',
      badge: 'Signature',
      image: '',
      description: '',
      fabricDetails: '',
      careInstructions: '',
      sizes: '',
      colors: ''
    });
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      badge: product.badge || 'Signature',
      image: product.image,
      description: product.description || '',
      fabricDetails: product.fabricDetails || '',
      careInstructions: product.careInstructions || '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes || '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : product.colors || ''
    });
    setIsAddModalOpen(true);
  };

  // Image File Upload Handler
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: formData.colors.split(',').map(c => c.trim()).filter(Boolean),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, formattedData);
    } else {
      addProduct(formattedData);
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeletingProductId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Action Bar & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#04120e] p-4 rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-white/50 text-xl">search</span>
            <input
              type="text"
              placeholder="Search product or SKU..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#735c00]"
            />
          </div>

          {/* Category Filter Pills */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-auto bg-white/5 border border-white/15 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-[#735c00]"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id === 'all' ? 'all' : cat.name} className="bg-[#04120e]">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 bg-[#735c00] hover:bg-[#8e7200] text-white px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-[#04120e] rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-white/5 text-emerald-400 uppercase tracking-wider text-[10px] border-b border-white/10">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (₦)</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-white/50">
                    No products match your search or filter.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map(product => (
                  <tr key={product.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-white/10 bg-white/5"
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{product.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[10px] text-[#735c00] font-semibold">{product.sku}</span>
                            {product.badge && (
                              <span className="text-[9px] bg-[#735c00]/20 text-amber-300 border border-[#735c00]/40 px-1.5 py-0.2 rounded uppercase font-bold">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white/90">{product.category}</td>
                    <td className="p-4 font-bold text-white">₦{product.price.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateStock(product.id, -1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xs"
                          title="Decrease Stock"
                        >
                          -
                        </button>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          product.stock <= 5 ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {product.stock} units
                        </span>
                        <button
                          onClick={() => updateStock(product.id, 1)}
                          className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xs"
                          title="Increase Stock"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-amber-400 font-semibold">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span>{product.rating || '5.0'}</span>
                        <span className="text-[10px] text-white/40">({product.reviews || 0})</span>
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(product)}
                        className="p-2 bg-white/5 hover:bg-white/15 text-white rounded-lg transition-colors border border-white/10"
                        title="Edit Product"
                      >
                        <span className="material-symbols-outlined text-base">edit</span>
                      </button>
                      <button
                        onClick={() => setDeletingProductId(product.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
                        title="Delete Product"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div>
            Showing <span className="font-semibold text-white">{filteredProducts.length === 0 ? 0 : startIndex + 1}</span> to{' '}
            <span className="font-semibold text-white">{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</span> of{' '}
            <span className="font-semibold text-white">{filteredProducts.length}</span> items
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={validCurrentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors border border-white/10"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-semibold text-xs transition-colors ${
                    page === validCurrentPage
                      ? 'bg-[#735c00] text-white shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-white/80'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              disabled={validCurrentPage === totalPages || filteredProducts.length === 0}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors border border-white/10"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#04120e] rounded-2xl border border-[#735c00]/40 p-6 space-y-5 z-10 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="text-xl font-bold font-serif text-white">
                {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New Product to Storefront'}
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/60 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-white">
              {/* Image Preview & Upload Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/40 border border-white/20 flex-shrink-0 flex items-center justify-center">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-white/30 text-3xl">image</span>
                  )}
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <label className="block text-emerald-400 font-bold uppercase text-[10px]">Product Photo / Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full text-xs text-white/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#735c00] file:text-white hover:file:bg-[#8e7200] file:cursor-pointer"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/40 uppercase">Or Image URL:</span>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white text-[11px] focus:outline-none focus:border-[#735c00]"
                      placeholder="/assets/abaya.png or https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                    placeholder="e.g. Royal Gold Velvet Abaya"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.name} className="bg-[#04120e]">{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Price (₦ NGN)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                    placeholder="45000"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Boutique Badge Tag</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                  >
                    <option value="Signature" className="bg-[#04120e]">Signature</option>
                    <option value="Exclusive" className="bg-[#04120e]">Exclusive</option>
                    <option value="Bestseller" className="bg-[#04120e]">Bestseller</option>
                    <option value="Essential" className="bg-[#04120e]">Essential</option>
                    <option value="Bespoke" className="bg-[#04120e]">Bespoke</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                  placeholder="Detailed product story & luxury design notes..."
                ></textarea>
              </div>

              {/* Smart Sizes Picker */}
              <div>
                <label className="block text-white/70 mb-2 font-semibold uppercase tracking-wider">
                  {formData.category === 'Shoes' ? 'Shoe Sizes (EU)' : 'Available Sizes'}
                </label>

                {formData.category === 'Shoes' ? (
                  /* Shoe size chip selector */
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'].map(size => {
                        const currentSizes = formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean) : [];
                        const isSelected = currentSizes.includes(size);
                        return (
                          <button
                            type="button"
                            key={size}
                            onClick={() => {
                              let updated;
                              if (isSelected) {
                                updated = currentSizes.filter(s => s !== size);
                              } else {
                                updated = [...currentSizes, size].sort((a, b) => Number(a) - Number(b));
                              }
                              setFormData({ ...formData, sizes: updated.join(', ') });
                            }}
                            className={`w-10 h-10 rounded-lg text-xs font-bold transition-all border ${
                              isSelected
                                ? 'bg-[#735c00] text-white border-[#735c00]'
                                : 'bg-white/5 text-white/70 border-white/15 hover:border-[#735c00] hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                    {formData.sizes && (
                      <p className="text-[10px] text-white/40">Selected: <span className="text-amber-300">{formData.sizes}</span></p>
                    )}
                  </div>
                ) : (
                  /* Clothing / fabric sizes text input */
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                    placeholder="e.g. S (54), M (56), L (58), XL (60)  or  5 Yards, 6 Yards"
                  />
                )}
              </div>

              <div>
                <label className="block text-white/70 mb-1 font-semibold uppercase tracking-wider">Care Guidelines</label>
                <input
                  type="text"
                  value={formData.careInstructions}
                  onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#735c00]"
                  placeholder="e.g. Dry clean only / Wipe with soft cloth"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#735c00] hover:bg-[#8e7200] text-white font-semibold text-xs uppercase tracking-wider shadow-lg"
                >
                  {editingProduct ? 'Save Changes' : 'Publish to Storefront'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDeletingProductId(null)} />
          <div className="relative w-full max-w-md bg-[#04120e] rounded-2xl border border-red-500/40 p-6 space-y-4 z-10 text-center">
            <span className="material-symbols-outlined text-4xl text-red-400">warning</span>
            <h3 className="text-lg font-bold text-white">Delete Product</h3>
            <p className="text-xs text-white/60">Are you sure you want to remove this item from the boutique catalog?</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingProductId)}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
