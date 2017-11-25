export default {
	getXPath: function (obj) {
		var arr = [],
				iTemp = 0,
				txt = obj.innerText;

		function getTagIndex(tag) {
				var begin = 0;
				var firstChild = (tag && tag.parentNode) ? tag.parentNode.firstChild : null;
				while (firstChild) {
						if (firstChild == tag) {
								return begin == 0 ? "" : "[" + (begin + 1) + "]";
						}
						if (firstChild.nodeType == 1 && firstChild.tagName == tag.tagName) {
								begin++;
						}
						firstChild = firstChild.nextSibling;
				}
				return "";
		}

		function getAttr(tag) {
				var ret = [];
				(tag && tag.id) && ret.push("@id='" + tag.id + "'");
				//	(tag && tag.className) && ret.push("@class='" + tag.className + "'");
				return ret.length ? "[" + ret.join(" and ") + "]" : "";
		}

		while (obj) {
				arr[iTemp++] = obj.nodeName + getTagIndex(obj) + getAttr(obj);
				if (obj.id) {
						break;
				}
				if (obj.tagName != "HTML") {
						obj = obj.parentNode;
				} else {
						break;
				}
		}
		arr.unshift((txt.match(/\n/) ? txt.match(/(.*)\n/)[1] + "^^^" : txt));
		return arr.reverse();
}
}