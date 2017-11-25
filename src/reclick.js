import storge from "./storge";
import XPath from "./xpath";


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


