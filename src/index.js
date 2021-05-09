(function () {
  var global = typeof window !== 'undefined' ? window : this || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var defaults = { limit: 10 };
  var execludes = ['constructor', 'length'];

  var NxLimitArray = nx.declare('nx.LimitArray', {
    properties: {
      length: function () {
        return this.data.length;
      }
    },
    methods: {
      init: function (inData, inOptions) {
        this.options = nx.mix(null, defaults, inOptions);
        this.data = inData || [];
        this.override();
      },
      gets: function () {
        return this.data.slice(-this.options.limit);
      },
      update: function () {
        this.data = this.gets();
      },
      override: function () {
        var protoMethods = Object.getOwnPropertyNames(Array.prototype);
        var overrides = protoMethods.filter(function (item) {
          return !execludes.includes(item);
        });

        this.update();
        overrides.forEach(function (name) {
          this[name] = function () {
            this.update();
            return this.data[name].apply(this, arguments);
          };
        }, this);
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxLimitArray;
  }
})();
