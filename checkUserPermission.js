const _ = require('lodash');
const YAML = require('yaml');
const FS = require('fs/promises');
const Path = require('path');

const { REQUIRED_PERMISSION, WORKING_DIRECTORY = '', USER } = process.env;

async function checkUserPermission ({ github, context, core }) {
	const permissionsFile = await FS.readFile(Path.join(WORKING_DIRECTORY, './permissions.yaml'));
	const yaml = YAML.parse(permissionsFile.toString());
	const users = _.get(yaml, REQUIRED_PERMISSION);
	if ( !users || users.indexOf(USER) === -1 ) {
		core.setFailed(`User ${USER} does not have required permission '${REQUIRED_PERMISSION}'.`);
	}
}

module.exports = checkUserPermission;
