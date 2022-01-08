'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20220107232736 extends Migration {

  async up() {
    this.addSql('create table "profile" ("uuid" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null);');
    this.addSql('alter table "profile" add constraint "profile_pkey" primary key ("uuid");');
  }

}
exports.Migration20220107232736 = Migration20220107232736;
