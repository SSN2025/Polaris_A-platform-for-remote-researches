'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

export default function SearchFilters({ filterOptions }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Current filter values from URL
  const currentQuery = searchParams.get('q') || '';
  const currentExpedition = searchParams.get('expedition') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentSubcategory = searchParams.get('subcategory') || '';
  const currentYear = searchParams.get('year') || '';
  const currentResearchSite = searchParams.get('researchSite') || '';
  const currentKeyword = searchParams.get('keyword') || '';

  const [searchInput, setSearchInput] = useState(currentQuery);

  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change (unless page is being set explicitly)
      if (!('page' in updates)) {
        params.delete('page');
      }

      startTransition(() => {
        router.push(`/research?${params.toString()}`);
      });
    },
    [searchParams, router]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({ q: searchInput.trim() });
  };

  const handleFilterChange = (key, value) => {
    updateParams({ [key]: value });
  };

  const removeFilter = (key) => {
    updateParams({ [key]: '' });
    if (key === 'q') setSearchInput('');
  };

  const clearAll = () => {
    setSearchInput('');
    startTransition(() => {
      router.push('/research');
    });
  };

  // Build active filters array
  const activeFilters = [];
  if (currentQuery) activeFilters.push({ key: 'q', label: `Search: "${currentQuery}"` });
  if (currentExpedition) activeFilters.push({ key: 'expedition', label: `Expedition: ${currentExpedition}` });
  if (currentCategory) activeFilters.push({ key: 'category', label: `Category: ${currentCategory}` });
  if (currentSubcategory) activeFilters.push({ key: 'subcategory', label: `Subcategory: ${currentSubcategory}` });
  if (currentYear) activeFilters.push({ key: 'year', label: `Year: ${currentYear}` });
  if (currentResearchSite) activeFilters.push({ key: 'researchSite', label: `Site: ${currentResearchSite}` });
  if (currentKeyword) activeFilters.push({ key: 'keyword', label: `Keyword: ${currentKeyword}` });

  const hasFilters = activeFilters.length > 0;

  return (
    <div>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <label htmlFor="research-search" className="sr-only">
            Search papers
          </label>
          <input
            id="research-search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search papers by title, abstract, or summary..."
            className="input-field pl-12 pr-4 py-3 text-base"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-gray-500">Active filters:</span>
          {activeFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => removeFilter(filter.key)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors"
            >
              {filter.label}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-sm text-red-600 hover:text-red-700 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-700 mb-4"
        aria-expanded={mobileOpen}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm4 4a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zm2 4a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z"
          />
        </svg>
        {mobileOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter Panel */}
      <div className={`${mobileOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {/* Expedition */}
          <div>
            <label htmlFor="filter-expedition" className="block text-sm font-medium text-gray-700 mb-1">
              Expedition
            </label>
            <select
              id="filter-expedition"
              value={currentExpedition}
              onChange={(e) => handleFilterChange('expedition', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Expeditions</option>
              {filterOptions.expeditions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="filter-category"
              value={currentCategory}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Categories</option>
              {filterOptions.categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label htmlFor="filter-subcategory" className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              id="filter-subcategory"
              value={currentSubcategory}
              onChange={(e) => handleFilterChange('subcategory', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Subcategories</option>
              {filterOptions.subcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label htmlFor="filter-year" className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <select
              id="filter-year"
              value={currentYear}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Years</option>
              {filterOptions.years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Research Site */}
          <div>
            <label htmlFor="filter-site" className="block text-sm font-medium text-gray-700 mb-1">
              Research Site
            </label>
            <select
              id="filter-site"
              value={currentResearchSite}
              onChange={(e) => handleFilterChange('researchSite', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Sites</option>
              {filterOptions.researchSites.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </select>
          </div>

          {/* Keywords */}
          <div>
            <label htmlFor="filter-keyword" className="block text-sm font-medium text-gray-700 mb-1">
              Keyword
            </label>
            <select
              id="filter-keyword"
              value={currentKeyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="input-field text-sm py-2"
            >
              <option value="">All Keywords</option>
              {filterOptions.keywords.map((kw) => (
                <option key={kw} value={kw}>
                  {kw}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-blue-600 mb-4">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Updating results...
        </div>
      )}
    </div>
  );
}
