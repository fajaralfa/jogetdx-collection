# Websocket Example

Example of websocket plugin with explicit connection cleanup

setup:

- Include ['/lifecycle-hooks/lifecycle-hooks.js'](/lifecycle-hooks/lifecycle-hooks.js) to UI Builder -> Settings -> Theme (Your Theme) -> Advanced -> Sub Header (You can also copy the content javascript directly to Custom Javascript section).
- Install this plugin (websocket-example).
- Create new menu in UI Builder and create new html element.
- Copy the ['content/example.html'](content/example.html) to the html element and save changes.
- Open the new menu and observe browser console and system monitor. Also try to navigate between pages and see if the connection closed properly.

notes:

- the lifecycle-hooks.js is needed because the provided example doesn't use joget's builtin hooks.