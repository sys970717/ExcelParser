'use strict';

const { env } = process;

module.exports = {
    AWSAccessKeyId: env.AWSAccessKeyId,
    AWSSecretAccessKey: env.AWSSecretAccessKey,
    AWSRegion: env.AWS_REGION,
};