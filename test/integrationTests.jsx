var testsContext = require.context("../src", true, /^.*\.(integation-spec)$/);
testsContext.keys().forEach(testsContext);
