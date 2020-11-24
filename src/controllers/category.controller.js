let _categoryService = null;

class CategoryController {
  constructor({ CategoryService }) {
    _categoryService = CategoryService;
  }

  async index(req, res) {
    const categories = await _categoryService.getAllWithSubcategories();
    return res.send(categories);
  }
}

module.exports = CategoryController;
