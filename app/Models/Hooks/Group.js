'use strict';

const Hash = use('Hash');

const GroupHook = (module.exports = {});

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} groupInstance
 *
 * @return {void}
 */
GroupHook.hashInviteToken = async groupInstance => {
  groupInstance.token = await Hash.make(groupInstance.name);
};
