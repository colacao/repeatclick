import storge from "./storge";
import XPath from "./xpath";

function getPosition(ev) {
		var box = ev.target.getBoundingClientRect();
		return [box.left, box.top];
}
function getXY(ev) {
		var mid = getMid();
		var x = ev['touches'] ? ev.touches[0].pageX - mid : ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - mid;
		var y = ev['touches'] ? ev.touches[0].pageY : ev.y + document.body.scrollTop + document.documentElement.scrollLeft;
		return [x, y];
}
function getMid() {
		var smid = storge.getItem('mid');
		if (smid) {
				return smid
		} else {
				var ddw = document.documentElement.clientWidth,
						dbw = document.body.clientWidth,
						ddsw = document.documentElement.scrollWidth,
						dbsw = document.body.scrollWidth,
						mid = 0;
				if ((dbw || ddw) < (ddsw || dbsw)) {
						mid = ((ddsw || dbsw) / 2) | 0;
				} else {
						mid = ((ddw || dbw) / 2) | 0;
				}
				return mid;
		}
}
export default {
	init:function () {
		try {
				var beginTouch = [0, 0];
				document.addEventListener("touchstart", function(e) {
						beginTouch = [e.touches[0].pageX, e.touches[0].pageY];
				}, false);
				document.addEventListener("touchend", function(e) {
						var arr = XPath.getXPath(e.target);
						var txt = arr.pop();
						var xpath = arr.join('/');
						if (!arr[0].match(/HTML\//)) {
								xpath = "//" + xpath;
						}
						var xy = getPosition(e);
						var mid = getMid();
						var _ubt_txt = storge.getItem('_ubt_') || "[]";
						var _ubt_ = JSON.parse(_ubt_txt);
						var splitTime = _ubt_.length && (new Date() - _ubt_[_ubt_.length - 1][0]);
						if (_ubt_.length && _ubt_[_ubt_.length - 1][9] == xpath && beginTouch[0] == e.changedTouches[0].pageX && beginTouch[1] == e.changedTouches[0].pageY) {
								window["$error"] && $error.report && $error.report(new Error("click,"+[splitTime, beginTouch[0], beginTouch[1], e.changedTouches[0].pageX, e.changedTouches[0].pageY,mid, xpath, txt, document.URL].join(',')))
						}
						_ubt_.push([+new Date(), beginTouch[0], beginTouch[1], e.changedTouches[0].pageX, e.changedTouches[0].pageY, , xy[0], xy[1],mid, xpath, txt, document.URL]);
						storge.setItem("_ubt_", JSON.stringify(_ubt_));
				}, false);
		} catch (err) {
				console.error(err);
		}
	}
}


