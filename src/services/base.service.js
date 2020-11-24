class BaseService {
  constructor(repository) {
    this._repository = repository;
  }

  async get(id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = 'Bad Request';
      throw error;
    }
    const currentEntity = await this._repository.get(id);

    if (!currentEntity) {
      const error = new Error();
      error.status = 404;
      error.message = 'Not found';
      throw error;
    }

    return currentEntity;
  }

  async getAll() {
    return await this._repository.getAll();
  }

  async create(entity) {
    const createdEntity = await this._repository.create(entity);
    return createdEntity;
  }

  async update(id, entity) {
    const updatedEntity = await this._repository.update(entity, id);
    return updatedEntity;
  }
}

module.exports = BaseService;
