const BaseRepository = require('./base.repository');
let _category = null;
let _subcategory = null;
class CategoryRepository extends BaseRepository {
  constructor({ db }) {
    super(db, 'Category');
    _category = db.Category;
    _subcategory = db.Subcategory;
  }

  getAllWithSubcategories() {
    return _category.findAll({
      attributes: ['id', 'nameCategory', 'slug'],
      include: {
        model: _subcategory,
        as: 'subCategories',
        attributes: ['id', 'nameSubCategory', 'description', 'slug', 'img'],
        where: { status: 1 },
      },
    });
  }
}

module.exports = CategoryRepository;
