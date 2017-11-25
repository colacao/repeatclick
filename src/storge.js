export default  function(){
		return {
		getItem: function(key) {
				try {
						return sessionStorage.getItem(key)
				} catch (err) {
						return window["_storge_" + key];
				}
		},
		setItem: function(key, value) {
				try {
						sessionStorage.setItem(key, value)
				} catch (err) {
						window["_storge_" + key] = value;
				}
		}
	}
};