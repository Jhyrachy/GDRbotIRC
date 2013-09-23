# PlaceBot 2 - GDR Modded Version
# Original Placebot 2 repo: https://github.com/Hamcha/placebot2

Node.js IRC bot with dynamic module loading

NPM modules required:
	- irc
	- coffee

## Writing modules for PlaceBot 2

Writing modules for PlaceBot 2 is VERY easy, it just requires some basic knowledge of node.js (such as knowing how to bind an event) and you're ready to go!

Two javascript modules (which are quite similar) are included so that you can take them as a starting point for yours:

- Macro (!macro / !addmacro)
- Quotes (!quote / !addquote)

On my own i added:
- Join & part ("!join #channel" and "!part #channel")
- Turni ("!turni [msg]" to register a message and "!turni" for receive the messagge in query)
- Schede ("!addscheda [playername] {link}" to add a new one and "!scheda [playername]" to get it)
- Battaglia ("!editpv [playername] {life}" to register it "!pv [nomeplayer]" to get it. "!b [playername] {damage/heal}" to edit pv during battle and "!pv reset" to refresh pv to the original value)
- Help ("!comandi" to list and explain all the previus commands)