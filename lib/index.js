/**
 * dsh-tool-emoji (host half)
 *
 * This plugin is primarily a Web-client UI tweak: it replaces the built-in
 * tool-card icon area with emoji. The host half exists only so DSH's plugin
 * loader has a row to mount and can discover the bundled client half.
 */
const name = "dsh-tool-emoji";
const inject = [];

function apply(_ctx) {
  // No host-side behavior needed. The client half in ./client.js does all work.
}

export { apply, inject, name };
