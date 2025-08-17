function searchWord() {
    // Remove previous highlights
    document.querySelectorAll('.search-highlight').forEach(function(el) {
        el.outerHTML = el.innerText;
    });

    var input = document.getElementById('searchInput');
    if (!input) return;



    var value = input.value.trim();
    if (!value) return;
    var body = document.body;
    var found = false;

    function highlight(node) {
        if (node.nodeType === 3) {
            var idx = node.data.toLowerCase().indexOf(value.toLowerCase());
            if (idx >= 0) {
                var span = document.createElement('span');
                span.className = 'search-highlight';
                var matchedText = node.splitText(idx);
                var afterMatch = matchedText.splitText(value.length);
                var clone = matchedText.cloneNode(true);
                span.appendChild(clone);
                matchedText.parentNode.replaceChild(span, matchedText);
                span.scrollIntoView({behavior: "smooth", block: "center"});
                // Remove highlight after 1s
                setTimeout(function() {
                    if (span.parentNode) span.outerHTML = span.innerText;
                }, 1000);
                found = true;
                // Continue searching in the rest of the node
                highlight(afterMatch);
            }
        } else if (node.nodeType === 1 && node.childNodes && !/(script|style|input|textarea)/i.test(node.tagName)) {
            // Use Array.from to avoid issues when childNodes change during iteration
            Array.from(node.childNodes).forEach(function(child) {
                highlight(child);
            });
        }
    }

    highlight(body);

    if (!found) {
        alert('Word not found!');
    }
}

document.getElementById('searchInput')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchWord();
});

// Remove highlights when input is cleared
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    if (!e.target.value.trim()) {
        document.querySelectorAll('.search-highlight').forEach(function(el) {
            el.outerHTML = el.innerText;
        });
    }
});

// Remove highlights when input loses focus
document.getElementById('searchInput')?.addEventListener('blur', function(e) {
    document.querySelectorAll('.search-highlight').forEach(function(el) {
        el.outerHTML = el.innerText;
    });
});

window.addEventListener('DOMContentLoaded', function() {
    var overlay = document.getElementById('announcement-overlay');
    if (overlay) {
        setTimeout(function() {
            overlay.classList.add('show');
            setTimeout(function() {
                overlay.classList.remove('show');
            }, 2000);
        }, 2000);
    }
});

