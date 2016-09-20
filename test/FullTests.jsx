var testsContext = require.context("../src", true, /^.*\.(spec|integration-spec)$/);
testsContext.keys().forEach(testsContext);
