// Code design inspired by http://userscripts.org/scripts/show/7347 .  Not
// overriding form submit prototypes like that does because I don't know of a
// good way to do this with Isolated Worlds (see http://groups.google.com/
// group/chromium-dev/browse_thread/thread/118689ceda861163/ff25578ed3585edd )
// and I'm not sure the password manager would pick it up anyway (see comment
// below).

function enableAutocomplete()
{
    var snapshot = document.evaluate('//@autocomplete',
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
        numItems = snapshot.snapshotLength - 1;

    for (var i = numItems; i >= 0; i--)
        snapshot.snapshotItem(i).nodeValue = 'on';
}

// The password manager code checks for "autocomplete=off" in a callback
// from WebCore when the DOM content is loaded.  It doesn't seem to be
// documented, but this callback seems to happen after in-page event listeners
// fire, and before content scripts with "run_at" = "document_end" are loaded.
// Therefore, we load this script early and then run the actual transform code
// on an appropriate event listener.
window.addEventListener('DOMContentLoaded', enableAutocomplete, false);