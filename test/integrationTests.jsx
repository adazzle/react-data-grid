var testsContext = require.context("../packages", true, /^.*\.(integation-spec)$/);
testsContext.keys().forEach(testsContext);
