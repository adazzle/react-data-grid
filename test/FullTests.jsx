var testsContext = require.context("../packages", true, /^.*\.(spec|integration-spec)$/);
testsContext.keys().forEach(testsContext);
