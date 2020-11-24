const BaseService = require('./base.service');
let _categoryRepository = null;
class CategoryService extends BaseService {
  constructor({ CategoryRepository }) {
    super(CategoryRepository);
    _categoryRepository = CategoryRepository;
  }

  async getAllWithSubcategories() {
    return await _categoryRepository.getAllWithSubcategories();
  }
}

module.exports = CategoryService;
