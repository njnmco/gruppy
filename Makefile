
gruppy.zip : gruppy.js manifest.json
	zip $@ $?

.PHONY: tag

gruppy.zip : tag

tag : ##
	git diff --exit-code
	git tag -a `jq -r .version manifest.json`
