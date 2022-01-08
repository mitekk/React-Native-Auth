'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20220108205823 extends Migration {

  async up() {
    this.addSql('alter table "profile" rename column "title" to "nickname";');
  }

}
exports.Migration20220108205823 = Migration20220108205823;
