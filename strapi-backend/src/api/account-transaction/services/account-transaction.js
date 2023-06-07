'use strict';

/**
 * account-transaction service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::account-transaction.account-transaction');
