class CategoryRepository {
  constructor({ db }) {
    this.db = db;
  }

  getAllWithSubcategories() {
    return this.db.Category.findAll({
      attributes: ['id', 'nameCategory', 'slug'],
      include: {
        model: this.db.Subcategory,
        as: 'subCategories',
        attributes: ['id', 'nameSubCategory', 'description', 'slug', 'img'],
        where: { status: 1 },
      },
    });
  }

  getSubcategoryBySlug(slug) {
    return this.db.Subcategory.findOne({ where: { slug } });
  }
}

module.exports = CategoryRepository;
