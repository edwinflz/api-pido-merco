const BaseService = require('./base.service');
const { deleteFile } = require('../helpers/delete-file.helper');
const { generateError } = require('../helpers/generate-error.helper');
const { CONSTANTS } = require('../helpers');
class ShopperService extends BaseService {
  constructor({ db, ShopperRepository, UserService }) {
    super(ShopperRepository);
    this.db = db;
    this.shopperRepository = ShopperRepository;
    this.userService = UserService;
  }

  async getUserIncludeShopper(id) {
    return await this.userService.getUserIncludeShopper(id);
  }

  async saveOrUpdate(request, file, { id }) {
    const hasUser = await this.getUserIncludeShopper(id);

    if (!hasUser) {
      generateError(CONSTANTS.STATUS_419, CONSTANTS.ERROR_AUTH_TOKEN);
    }

    try {
      if (file && !!hasUser.shopper) {
        if (hasUser.shopper.imgProfile) deleteFile(hasUser.shopper.imgProfile);
      }
      const shopper = this.buildShopper(request, hasUser, file);
      const t = await this.db.sequelize.transaction();
      await this.userService.update(
        { ...hasUser, name: request.userName },
        id,
        { transaction: t }
      );
      if (!!hasUser.shopper) {
        await this.shopperRepository.update(hasUser.shopper.id, shopper, {
          transaction: t,
        });
      } else {
        await this.shopperRepository.create(shopper, {
          transaction: t,
        });
      }
      await t.commit();
      return {
        status: 200,
        msg: 'Perfil actualizado con exito!',
      };
    } catch (error) {
      await t.rollback();
      if (!!file) deleteFile(file.filename);
      generateError(CONSTANTS.STATUS_404, CONSTANTS.ERROR_SHOPPER_UPDATE);
    }
  }

  buildShopper(request, hasUser, file) {
    let filename = '';
    if (!!file) {
      filename = file.filename;
    } else {
      if (!!hasUser.shopper) {
        filename = hasUser.shopper.imgProfile;
      } else {
        filename = '';
      }
    }
    return {
      userId: hasUser.id,
      municipalityId: request.municipality,
      domicile: request.domicile,
      domicileTwo: request.domicileTwo === 'null' ? '' : request.domicileTwo,
      domicileThree:
        request.domicileThree === 'null' ? '' : request.domicileThree,
      imgProfile: filename,
    };
  }
}

module.exports = ShopperService;
