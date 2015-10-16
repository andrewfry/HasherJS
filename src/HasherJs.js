
var HashProp = {};
HashProp.prototype.Name = "";
HashProp.prototype.Value = "";


$.HasherJs = (function () {
    "use strict";

    function getHashes() {
        var hashProperties = location.hash.split("/");
        var hashes = [];

        for (var i = 1; i < hashProperties.length; i++) {
            var obj = new HashProp();
            obj.Name = decodeURIComponent(hashProperties[i].split("=")[0]);
            obj.Value = decodeURIComponent(hashProperties[i].split("=")[1]);

            hashes.push(obj);
        }

        return hashes;
    }

    function setArrayToWindowHash(hashes) {
        var hashString = "";

        for (var i = 0; i < hashes.length; i++) {
            hashString = hashString + "/" + encodeURIComponent(hashes[i].Name) + "=" + encodeURIComponent(hashes[i].Value);
        }

        if (hashString !== "") {
            window.location.hash = hashString;
            return true;
        }
        else {
            return false;
        }
    }

    return {

        Add: function (fieldName, fieldValue) {
            if (fieldName !== "" && fieldName !== undefined) {
                var obj = new HashProp();
                obj.Name = fieldName;
                obj.Value = fieldValue;

                var hashes = getHashes();
                hashes.push(obj);

                return setArrayToWindowHash(hashes);
            }

            return false;
        },

        Exists: function (fieldName) {
            var hashes = getHashes();

            for (var i = 0; i < hashes.length; i++) {
                if (hashes[i].Name === fieldName) {
                    return true;
                }
            }

            return false;
        },

        Remove: function (fieldName) {
            var hashes = getHashes();

            for (var i = 0; i < hashes.length; i++) {
                if (hashes[i].Name === fieldName) {
                    hashes.splice(i, 1);
                    return setArrayToWindowHash(hashes);
                }
            }

            return false;
        },

        OnChange: function (hashChangeHandler) {
            $(window).on("hashchange", hashChangeHandler);
        },

        Equals: function (fieldName, value) {
            var fieldValue = this.GetValue(fieldName);

            if (fieldValue !== null && fieldValue !== undefined && fieldValue !== "") {
                if (value.toLowerCase() === fieldValue.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },

        GetValue: function (fieldName) {
            var hashes = getHashes();

            for (var i = 0; i < hashes.length; i++) {
                if (hashes[i].Name.toLowerCase() === fieldName.toLowerCase()) {
                    return hashes[i].Value;
                }
            }

            return undefined;
        },

        SetValue: function (fieldName, newValue) {
            var hashes = getHashes();

            for (var i = 0; i < hashes.length; i++) {
                if (hashes[i].Name === fieldName) {
                    hashes[i].Value = newValue;

                    return setArrayToWindowHash(hashes);
                }
            }

            return this.Add(fieldName, newValue);
        },

        Stringify: function () {
            var hashes = getHashes();
            var hashString = "";

            for (var i = 0; i < hashes.length; i++) {
                hashString = hashString + "/" + encodeURIComponent(hashes[i].Name) + "=" + encodeURIComponent(hashes[i].Value);
            }

            if (hashString !== "") {
                return "#" + hashString;
            }

            return "";
        }

    };
})();
