let model = {
    bind: function () {
        var self = this
        this.on('change blur input', function () {
            self.set(self.el.value)
        })
    },
    update: function (value) {
        this.el.value = value
    }
}

let text = {
    bind: function () {
        // do nothing/*  */
    },
    update: function (value) {
        this.el.textContent = value
    }
}

export {
    model,
    text
};