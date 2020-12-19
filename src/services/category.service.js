class CategoryService {
  constructor({ CategoryRepository }) {
    this.categoryRepository = CategoryRepository;
  }

  async getAllWithSubcategories() {
    return await this.categoryRepository.getAllWithSubcategories();
  }

  async getSubcategoryBySlug(slug) {
    return await this.categoryRepository.getSubcategoryBySlug(slug);
  }
}

module.exports = CategoryService;
