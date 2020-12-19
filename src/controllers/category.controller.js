let categoryService = null;
class CategoryController {
  constructor({ CategoryService }) {
    categoryService = CategoryService;
  }

  async index(req, res) {
    const categories = await categoryService.getAllWithSubcategories();
    return res.send(categories);
  }
}

module.exports = CategoryController;
