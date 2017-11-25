import reClick from "./reclick";

if (typeof define == 'function'  && define.amd) {
    // AMD
    define(function() {
        return reClick;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    // CMD
    module.exports = reClick;
}