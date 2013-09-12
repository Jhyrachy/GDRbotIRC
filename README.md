# PlaceBot 2

Node.js IRC bot with dynamic module loading

NPM modules required:

- For the bare client:
	- irc
	- coffee
- For specific modules:
	- nodemw (Wikibot)
	- mstranslator (Microsoft translator)
	- request (Haskellbot)

## Writing modules for PlaceBot 2

Writing modules for PlaceBot 2 is VERY easy, it just requires some basic knowledge of node.js (such as knowing how to bind an event) and you're ready to go!

Two javascript modules (which are quite similar) are included so that you can take them as a starting point for yours:

- Macro (!macro / !addmacro)
- Quotes (!quote / !addquote)